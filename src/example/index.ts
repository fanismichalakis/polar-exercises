import { authenticatedLndGrpc, subscribeToForwardRequests } from "lightning"
import { BOB_LND_CERT, BOB_LND_MACAROON, BOB_LND_SOCKET } from "./config"

// Authenticate with Bob's LND node
const { lnd: bob } = authenticatedLndGrpc({
    cert: BOB_LND_CERT,
    macaroon: BOB_LND_MACAROON,
    socket: BOB_LND_SOCKET
})

const sub = subscribeToForwardRequests({ lnd: bob });

sub.on('forward_request', async forward => {
  console.log('intercepted forward request')
  console.log(`asking to forward ${forward.mtokens} msats`)
  if (forward.mtokens > 1_000_000) {
    console.log('amount is above above 1000 sats, rejecting')
    forward.reject()
  } else {
    console.log('amount is below 1000 sats, accepting')
    forward.accept()
  }
})

sub.on('error', (error) => {
    console.error('Error:', error);
});

console.log('Listening for forward requests')

process.on('SIGINT', () => {
    console.log('Gracefully shutting down...');
    sub.removeAllListeners();
    process.exit(0);
});

// Keep the event loop alive
setInterval(() => {}, 1000);
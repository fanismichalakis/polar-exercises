# Preimage Stealing

The goal of this exercise is to demonstrate why it's unsafe to reuse Lighting invoices.

## Context

A HTLC can be claimed by anyone with knowledge of the preimage. Each node that participates in successfully routing a payment learned the corresponding preimage, and would hence be able to claim any future payment to the same invoice for themselves.

Let's take an example where Dave creates an invoice and publishes it on social media. Alice sees the invoice, and pays it. The payment succeeds, and now all the nodes that took part in it (Alice and any routing node involved) knows the preimage. A few minutes later, Bob sees Dave invoice on social media and pays it as well (he has no way of knowing Alice already paid). If one of the nodes involved in Alice's payment happens to be on the route for Bob's payment too, they can short-circuit the payment path and settle the HTLC for themselves using the preimage their learnt from Alice's payment.

## Exercise

Design a Polar network and write a script to illustrate this scenario. You can use the `lightning` package as in the [example](../example/index.ts) to interact with the nodes. Remember that if you write your script in a file called `index.ts`, you can run it from the root of this repository with `tsx src/preimage-stealing/index.ts`.

### Hints

In the `lightning` package, `subscribeToForwards` shows the preimage (a.k.a. secret as a HTLC is settled), and `subscribeToForwardRequests` let's you intercept HTLCs and decide whether to forward them, fail them, or settle them on the spot.

### Solution

You can find a proposed solution in [solution.ts](solution.ts). To run it, you'll need to:

- create an appropriate Polar network
- create a `.env` file with your network's configuration
- run `tsx src/preimage-stealing/solution.ts` in the terminal.

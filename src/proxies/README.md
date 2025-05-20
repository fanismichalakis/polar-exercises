# Payment Proxying

The goal of this exercise is to explore how payment privacy on Lightning can be improved through the use of proxies.

## Context

Receiver privacy on Lightning is suboptimal because receiving a payment requires the communication of some information regarding one's node. Moreover, in contexts where user rely on third parties (e.g. LSPs, custodians) to facilitate payments, said third parties can sometimes identify the sender and the receiver of a payment.

Solutions such as [lnproxy](https://lnproxy.org/) and [Lightning Blinder](https://github.com/supertestnet/lightning_blinder) aim to mitigate this issues by adding a proxy between the sender (and their LSP, if any) and the receiver.

## Exercises

### 1 - lnproxy

#### Instructions

Design a Polar network of 3 to 4 nodes:

- sender
- LSP (optional)
- proxy
- receiver.

Write a script to illustrate how the proxy can obfuscate the receiver node identity from the sender (and their LSP). You can for example use the [createHoldInvoice](https://github.com/alexbosworth/ln-service#createhodlinvoice) method of the `lightning` package.

#### Questions

1. One of the nodes needs to run a specific implementation (as of mid 2025). Which, and why?

2. What information does the proxy learn in the process?

3. Is the payment atomic? Why?

### 2 - Lightning Blinder

#### Instructions

The instructions are the same as in [1](#1---lnproxy), except this time you'll illustrate of Lightning Blinder works. For the *ouf-of-band* communication between the sender and the receiver, you can just use a variable in your script (or any other mechanism you see fit).

You can also demonstrate, in a separate script, how the Lightning Blinder can also be used to obfuscate the sender of a payment.

#### Questions

1. Are there any requirement when it comes to Lightning implementations? What does each node need to be able to do?

2. What information does the proxy learn in the process?

3. Is the payment atomic? Why?

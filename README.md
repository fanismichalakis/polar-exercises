# Plan ₿ Labs Lightning - Polar Exercises

This repository hosts exercices for a more hands-on understanding of Bitcoin's Lighting Network. This exercices are created in the context of study group dedicated to Lightning inside [Plan ₿ Network](planb.network) educational project. This group is called [Plan ₿ Labs Lightning](https://planb.network/en/plan-b-labs/lightning) and consists in biweekly meetings, as well as a Telegram group. Everyone is welcome, more info [here](https://planb.network/en/plan-b-labs/lightning).

## Goal

The goals of this exercises is to familiarize students with some concepts of the Lightning Network, while also providing them with tools that are currently used by developers in the industry.

## Installation

The exercises require two software tools:

- [Polar](https://lightningpolar.com/), to create a local "fake" Lightning Network, and
- a Docker engine, necessary to run this network. See Polar's [FAQ](https://lightningpolar.com/#1#faqs-2) for OS's dependant advices for Docker install (note that [Orbstack](https://orbstack.dev/) is also a great alternative to Docker Desktop).

You will also need NodeJS, a node package manager (such as npm, pnpm or yarn - I'm using pnpm) ; an IDE or a text editor to write some code, and a terminal to run said code.

## Example

Under the `/src` folder, you will find another folder called `example`. Follow the [README](./src/example/README.md) there to create your first network in Polar, and run your first script to do something with it!

## Exercises

Below is the list of proposed exercises. The date is the live session during which the exercise will be/has been reviewed. If that's in the past, the replay link takes you to a replay of this review session.

| Title | Date | Description | Replay |
|-------|------|-------------|--------|
|Preimage Stealing|2025-04-08|Show how a node that routed a payment to an invoice can steal funds if someone tries to pay that invoice again. [Details](./src/preimage-stealing/README.md)|        |

## Questions

If you have any questions or remarks, you're more than welcome to join the study group on Telegram group and write them there. The link to that group can be found [here](https://planb.network/en/plan-b-labs/lightning.). It's all free, as in of charge, *and* as in freedom.

___
Last updated: (890,731 ; 000000000000000000012b2c03ac867b192431224d006e7f1ed7b64c6a290f0b)

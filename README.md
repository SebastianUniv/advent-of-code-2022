# Advent of Code

This repository includes solutions to the advent of code 2022.

## Solved days

- [x] 1
- [x] 2
- [x] 3
- [x] 4
- [x] 5
- [x] 6
- [x] 7
- [x] 8
- [x] 9

## Environment

The repository assumes the following dependencies:

![node-v18.10.x](https://img.shields.io/badge/Node-v18.10.x-blue)
![js-esnext](https://img.shields.io/badge/JavaScript-esNext-blue)

## Usage

The following commands should be executed in the src directory.

### Setup

Install project dependencies:

```sh
yarn install
```

### Commands

Build JavaScript from TypeScript:

```sh
yarn build
```

Run compiled JavaScript:

```sh
yarn start
```

Run TypeScript:

```sh
yarn dev
```

Run TypeScript with live changes:

```sh
yarn dev:watch
```

Run Jest tests, if no test type is given it will run all tests:

```sh
yarn test <test-type> --coverage
```

## Notes

- Currently the datafiles with .txt extension are not copied during the build operation, so manual moving/copying is required. This is not necessary for the `yarn dev` command.

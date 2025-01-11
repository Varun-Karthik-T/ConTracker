require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { MNEMONIC, RPC_URL } = process.env;
console.log(MNEMONIC, RPC_URL);
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    polygon_zkevm: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: MNEMONIC
        },
        providerOrUrl: RPC_URL,
        pollingInterval: 8000 // Optional: to make HDWallet less "chatty" over JSON-RPC
      }),
      network_id: "2442", // Polygon zkEVM network ID
      gas: 2000000, // Lower gas limit to minimize fund usage
      gasPrice: 1000000000,// Lower gas price (1 gwei)
      confirmations: 2, // # of confirmations to wait between deployments
      timeoutBlocks: 200, // # of blocks before a deployment times out
      skipDryRun: true // Skip dry run before migrations
    }
  },
  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.8.18", // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
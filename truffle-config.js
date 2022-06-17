
require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const MNEMONIC = process.env.MNEMONIC
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID

module.exports = {
  api_keys: {
    etherscan: ETHERSCAN_API_KEY
  },
  plugins: [
    'truffle-plugin-verify'
  ],

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets )

    },
    ropsten: {
      provider: getProvider("ropsten"),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200000,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    main_fork: {
      provider: getProvider("main_fork"),
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      provider: getProvider("rinkeby"),
      network_id: 4,       // Rinkeby's id
      gas: 5500000,        // Rinkeby has a lower block limit than mainnet
      confirmations: 1,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 100000000,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    kovan: {
      provider: getProvider("kovan"),
      network_id: 42,       // Kovan's id
      gas: 3379244,        // Kovan has a lower block limit than mainnet
      confirmations: 1,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    hecotest: {
      provider: getProvider("heco_testnet"),
      network_id: "256",
      timeoutBlocks: 200,
      confirmations: 2,
      gasPrice: 2000000000,
      skipDryRun: true,
      networkCheckTimeout: 100000000,
      websockets: true
    },
    bsc_testnet: {
      provider: getProvider("bsc_testnet"),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: getProvider("bsc"),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  },
};


function getProvider(network) {
  return () => {
    switch (network) {
      case ("heco_testnet"):
        return new HDWalletProvider(MNEMONIC, `wss://ws-testnet.hecochain.com`);
      case ("heco_mainnet"):
        return new HDWalletProvider(MNEMONIC, `wss://ws-mainnet-node.huobichain.com`);
      case ("main_fork"):
        return new HDWalletProvider(MNEMONIC, `http://127.0.0.1:8545`);
      case ("bsc"):
        return new HDWalletProvider(MNEMONIC, `https://bsc-dataseed1.binance.org`);
      case ("bsc_testnet"):
        return new HDWalletProvider(MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`);
      case ("ropsten"):
        return new HDWalletProvider(MNEMONIC, `wss://ropsten.infura.io/ws/v3/${INFURA_PROJECT_ID}`);
      case ("rinkeby"):
        return new HDWalletProvider(MNEMONIC, `wss://rinkeby.infura.io/ws/v3/${INFURA_PROJECT_ID}`);
      default:
        return new HDWalletProvider("", ``);
    }
  };
}
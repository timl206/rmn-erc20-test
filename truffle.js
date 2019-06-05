require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

const infuraProvider = network =>
  providerWithMnemonic(
    process.env.MNEMONIC || "",
    `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
  );

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
  new HDWalletProvider(mnemonic, rpcEndpoint);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    kovan: {
      provider: infuraProvider("kovan"),
      network_id: "42",
      gasPrice: 1000000000 // 1wei
    }
  },
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "0.5.2"
    }
  }
};

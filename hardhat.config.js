require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, METAMASK_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "ropsten",
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
    },
  },
};

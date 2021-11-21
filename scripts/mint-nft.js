require("dotenv").config();
const { image: TOKEN_URI } = require("../nft-metadata.json");

const {
  API_URL,
  METAMASK_PUBLIC_KEY,
  METAMASK_PRIVATE_KEY,
  CONTRACT_ADDRESS,
  CREATE_NFT_TOKEN,
} = process.env;

const GAS_ESTIMATE_TIME = 1000000;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/mineNFT.sol/MineNFT.json");
const nftContract = new alchemyWeb3.eth.Contract(
  contract.abi,
  CONTRACT_ADDRESS
);

async function mintNFT(tokenURI) {
  const nonce = await alchemyWeb3.eth.getTransactionCount(
    METAMASK_PUBLIC_KEY,
    "latest"
  );

  const transactionConfig = {
    nonce: nonce, // nonce with the no of transactions from our account
    from: METAMASK_PUBLIC_KEY, // our MetaMask public key
    to: CONTRACT_ADDRESS, // the smart contract address we want to interact with
    gas: GAS_ESTIMATE_TIME, // fee estimate to complete the transaction
    data: nftContract.methods.createNFT(CREATE_NFT_TOKEN, tokenURI).encodeABI(), // call the createNFT function from our MineNFT.sol file and pass the account that should receive the minted NFT.
  };

  const signPromise = alchemyWeb3.eth.accounts.signTransaction(
    transactionConfig,
    METAMASK_PRIVATE_KEY
  );

  signPromise
    .then((signedTx) => {
      alchemyWeb3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of our transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of our transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting our transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT(TOKEN_URI);

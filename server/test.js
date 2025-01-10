const Project = require('./tests/project');
const Web3 = require('web3');
require('dotenv').config();

const { RPC_URL } = process.env;
const web3 = new Web3(RPC_URL);

(async () => {
  try {
    await Project.addWinner(2, 102, 5, 'Jfdfe Doe', 365, 1000000, 'New York, USA', 'Verifier', 'Approver');
    await Project.getWinnerDetails(5);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    web3.currentProvider.disconnect();
  }
})();
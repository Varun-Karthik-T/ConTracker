require('dotenv').config();
const Web3 = require('web3');
const ApprovedContractArtifact = require('../../dapp/build/contracts/ApprovedContract.json');

const { RPC_URL, PROJECT_CONTRACT_ADDRESS } = process.env;

// Set up Web3 provider
const web3 = new Web3(RPC_URL); // Replace with your provider URL

// Get the contract ABI and address
const abi = ApprovedContractArtifact.abi;
const contractAddress = PROJECT_CONTRACT_ADDRESS; // Replace with your deployed contract address

// Create a contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to add a winner
const addWinner = async (issueId, contractorId, projectId, name, tenure, amount, location, verifiedBy, approvedBy) => {
  const accounts = await web3.eth.getAccounts();
  const owner = accounts[0];

  try {
    const winner = await contract.methods.getWinner().call();
    if (winner.issueId !== '0') {
      console.log('Winner is already set!');
      return;
    }
  } catch (error) {
    // If the winner is not set, the call will fail, and we can proceed to set the winner
  }

  await contract.methods.setWinner(issueId, contractorId, projectId, name, tenure, amount, location, verifiedBy, approvedBy)
    .send({ from: owner, gas: 6000000, gasPrice: '10000000000' });
  console.log('Winner added successfully');
};

// Function to get winner details by project ID
const getWinnerDetails = async (projectId) => {
  const winner = await contract.methods.getWinner().call();

  if (parseInt(winner.projectId) === projectId) {
    console.log('Winner Details:');
    console.log('Issue ID:', winner.issueId);
    console.log('Contractor ID:', winner.contractorId);
    console.log('Project ID:', winner.projectId);
    console.log('Name:', winner.name);
    console.log('Tenure:', winner.tenure);
    console.log('Amount:', winner.amount);
    console.log('Location:', winner.location);
    console.log('Verified By:', winner.verifiedBy);
    console.log('Approved By:', winner.approvedBy);
  } else {
    console.log('No winner found for the given project ID');
  }
};

// Export the functions
module.exports = {
  addWinner,
  getWinnerDetails
};
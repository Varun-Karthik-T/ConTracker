const Web3 = require("web3");
const IssueManagement = require("../../dapp/build/contracts/IssueManagement.json");
require('dotenv').config();

const { RPC_URL, ISSUE_CONTRACT_ADDRESS } = process.env;
// Set up web3 provider (e.g., local Ganache instance or Infura for a public network)
const web3 = new Web3(RPC_URL); 



// Get the contract ABI and address
const abi = IssueManagement.abi;
const contractAddress = ISSUE_CONTRACT_ADDRESS;

// Create a contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to create an issue
async function createIssue(issueDetails, account) {
  const {
    issueId,
    issueName,
    description,
    dateOfComplaint,
    approval,
    denial,
    accuracy,
    altitude,
    latitude,
    longitude,
  } = issueDetails;

  try {
    const tx = await contract.methods
      .createIssue(
        issueId,
        issueName,
        description,
        dateOfComplaint,
        approval,
        denial,
        accuracy,
        altitude,
        latitude,
        longitude
      )
      .send({ from: account, gas: 3000000 });

    console.log("Issue created:", tx.events.IssueCreated.returnValues);
    return tx.events.IssueCreated.returnValues;
  } catch (error) {
    console.error("Error creating issue:", error);
    throw error;
  }
}

// Function to fetch an issue by index
async function fetchIssue(index) {
  try {
    const issue = await contract.methods.getIssueById(index).call();
    console.log("Fetched issue:", issue);
    return issue;
  } catch (error) {
    console.error("Error fetching issue:", error);
    throw error;
  }
}

module.exports = {
  createIssue,
  fetchIssue,
};

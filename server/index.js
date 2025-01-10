const { createIssue, fetchIssue } = require('./tests/issueFunctions');

async function main() {
  const issueDetails = {
    issueId: 9,
    issueName: " Damage",
    description: " damage near Adyar.",
    dateOfComplaint: "2025-01-10",
    approval : 10,
    denial : 0,
    accuracy: 10,
    altitude: -63,
    latitude: 128396614,
    longitude: 801552797,
  };

  const account = '0x874b2E9Bd8A7C3F89EaB4Bf51161750996C3d8Ea'; // Replace with your account address

  // Create an issue
  const createdIssue = await createIssue(issueDetails, account);
  console.log("Created Issue:", createdIssue);

  // Fetch the created issue
  console.log("Fetching Issue:", createdIssue.issueId);
  const fetchedIssue = await fetchIssue(createdIssue.issueId);
  console.log("Fetched Issue:", fetchedIssue);
}

main().catch(console.error);
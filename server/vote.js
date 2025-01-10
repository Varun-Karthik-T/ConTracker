const { createSpend, voteOnSpend, fetchSpend } = require('./votingFunctions');

async function main() {
  const spendDetails = {
    spendId: 5, // Ensure this is the correct spendId you want to use (sequential)
    reason: "Contractor spend for road repar"
  };

  const account = '0x9E75d87324FeEb9c8c618ed05e4fddf84E4Fff1C'; // Replace with your account address

  // Create a spend
  const createdSpend = await createSpend(spendDetails, account);
  console.log("Created Spend:", createdSpend);

  // Voting parameters
  const approvalVotes = 60;
  const denialVotes = 40;
  const totalVotes = 100;

  // Vote on the spend
  const votedSpend = await voteOnSpend(createdSpend.spendId, approvalVotes, denialVotes, totalVotes, account);
  console.log("Voted Spend:", votedSpend);

  // Fetch the voted spend
  const fetchedSpend = await fetchSpend(createdSpend.spendId);
  console.log("Fetched Spend:", fetchedSpend);
}

main().catch(console.error);
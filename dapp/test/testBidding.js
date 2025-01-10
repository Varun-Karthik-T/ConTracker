// const ApprovedContract = artifacts.require("ApprovedContract");

// function getWinnerDetails() {
//   return {
//     issueId: 1,
//     contractorId: 101,
//     contractorName: "John Doe",
//     tenure: 365,
//     amount: 1000000,
//     location: "New York, USA",
//     verifiedBy: "Verifier",
//     approvedBy: "Approver"
//   };
// }

// contract("ApprovedContract", (accounts) => {
//   let biddingInstance;
//   const [owner, verifiedBy, approvedBy] = accounts;

//   beforeEach(async () => {
//     biddingInstance = await ApprovedContract.new();
//   });

//   it("should deploy the contract", async () => {
//     const address = await biddingInstance.address;
//     assert.notEqual(address, 0x0, "Contract was not deployed successfully");
//   });

//   it("should set and retrieve the winner details correctly", async () => {
//     const {
//       issueId,
//       contractorId,
//       contractorName,
//       tenure,
//       amount,
//       location,
//       verifiedBy,
//       approvedBy
//     } = getWinnerDetails();

//     await biddingInstance.setWinner(issueId, contractorId, contractorName, tenure, amount, location, verifiedBy, approvedBy, { from: owner });

//     const winner = await biddingInstance.getWinner();

//     // Display the fetched data
//     console.log("Issue ID:", winner[0].toString());
//     console.log("Contractor ID:", winner[1].toString());
//     console.log("Winner Name:", winner[2]);
//     console.log("Winner Tenure:", winner[3].toString());
//     console.log("Winner Amount:", winner[4].toString());
//     console.log("Winner Location:", winner[5]);
//     console.log("Verified By:", winner[6]);
//     console.log("Approved By:", winner[7]);

//     assert.equal(winner[0].toString(), issueId.toString(), "Issue ID does not match");
//     assert.equal(winner[1].toString(), contractorId.toString(), "Contractor ID does not match");
//     assert.equal(winner[2], contractorName, "Winner name does not match");
//     assert.equal(winner[3].toString(), tenure.toString(), "Winner tenure does not match");
//     assert.equal(winner[4].toString(), amount.toString(), "Winner amount does not match");
//     assert.equal(winner[5], location, "Winner location does not match");
//     assert.equal(winner[6], verifiedBy, "Verified By does not match");
//     assert.equal(winner[7], approvedBy, "Approved By does not match");
//   });

//   it("should not allow setting the winner twice", async () => {
//     const {
//       issueId,
//       contractorId,
//       contractorName,
//       tenure,
//       amount,
//       location,
//       verifiedBy,
//       approvedBy
//     } = getWinnerDetails();

//     await biddingInstance.setWinner(issueId, contractorId, contractorName, tenure, amount, location, verifiedBy, approvedBy, { from: owner });

//     try {
//       await biddingInstance.setWinner(
//         2,
//         102,
//         "Another Contractor",
//         60,
//         300000,
//         "Texas",
//         "Verifier",
//         "Approver"
//       );
//       assert.fail("The contract allowed setting the winner twice!");
//     } catch (error) {
//       assert.include(error.message, "Winner is already set!", "Expected error message not received");
//     }
//   });
// });


const ApprovedContract = artifacts.require("ApprovedContract");

function getWinnerDetails() {
  return {
    issueId: 1,
    contractorId: 101,
    contractorName: "Jane Doe",
    tenure: 365,
    amount: 1000000,
    location: "New York, USA",
    verifiedBy: "Verifier",
    approvedBy: "Approver"
  };
}

function runTests() {
  contract("ApprovedContract", (accounts) => {
    let biddingInstance;
    const [owner, verifiedBy, approvedBy] = accounts;

    beforeEach(async () => {
      biddingInstance = await ApprovedContract.new();
    });

    it("should deploy the contract", async () => {
      const address = await biddingInstance.address;
      assert.notEqual(address, 0x0, "Contract was not deployed successfully");
    });

    it("should set and retrieve the winner details correctly", async () => {
      const {
        issueId,
        contractorId,
        contractorName,
        tenure,
        amount,
        location,
        verifiedBy,
        approvedBy
      } = getWinnerDetails();

      await biddingInstance.setWinner(issueId, contractorId, contractorName, tenure, amount, location, verifiedBy, approvedBy, { from: owner });

      const winner = await biddingInstance.getWinner();

      // Display the fetched data
      console.log("Issue ID:", winner[0].toString());
      console.log("Contractor ID:", winner[1].toString());
      console.log("Winner Name:", winner[2]);
      console.log("Winner Tenure:", winner[3].toString());
      console.log("Winner Amount:", winner[4].toString());
      console.log("Winner Location:", winner[5]);
      console.log("Verified By:", winner[6]);
      console.log("Approved By:", winner[7]);

      assert.equal(winner[0].toString(), issueId.toString(), "Issue ID does not match");
      assert.equal(winner[1].toString(), contractorId.toString(), "Contractor ID does not match");
      assert.equal(winner[2], contractorName, "Winner name does not match");
      assert.equal(winner[3].toString(), tenure.toString(), "Winner tenure does not match");
      assert.equal(winner[4].toString(), amount.toString(), "Winner amount does not match");
      assert.equal(winner[5], location, "Winner location does not match");
      assert.equal(winner[6], verifiedBy, "Verified By does not match");
      assert.equal(winner[7], approvedBy, "Approved By does not match");
    });

    it("should not allow setting the winner twice", async () => {
      const {
        issueId,
        contractorId,
        contractorName,
        tenure,
        amount,
        location,
        verifiedBy,
        approvedBy
      } = getWinnerDetails();

      await biddingInstance.setWinner(issueId, contractorId, contractorName, tenure, amount, location, verifiedBy, approvedBy, { from: owner });

      try {
        await biddingInstance.setWinner(
          2,
          102,
          "Another Contractor",
          60,
          300000,
          "Texas",
          "Verifier",
          "Approver"
        );
        assert.fail("The contract allowed setting the winner twice!");
      } catch (error) {
        assert.include(error.message, "Winner is already set!", "Expected error message not received");
      }
    });
  });
}

module.exports = {
  runTests
};

runTests();
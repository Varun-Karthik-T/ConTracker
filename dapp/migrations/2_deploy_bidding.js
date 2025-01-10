const approvedContract = artifacts.require("approvedContract");

module.exports = function (deployer) {
  deployer.deploy(approvedContract ,{
    gas: 5000000, // Set a lower gas limit
    gasPrice: 10000000000 
  });
};

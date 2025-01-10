const Bidding = artifacts.require("approvedContract");

module.exports = function (deployer) {
  deployer.deploy(Bidding);
};

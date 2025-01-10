const IssueManagement = artifacts.require("IssueManagement");   

module.exports = function (deployer) {
  deployer.deploy(IssueManagement);
};


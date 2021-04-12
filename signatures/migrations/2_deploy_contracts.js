var MessageSignatures = artifacts.require('./MessageSignatures.sol');

module.exports = function (deployer) {
  deployer.deploy(MessageSignatures);
};

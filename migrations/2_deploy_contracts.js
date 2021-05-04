const Cryptokitties = artifacts.require("Cryptokitties");

module.exports = function (deployer) {
  deployer.deploy(Cryptokitties, "https://url-to-your-game-server");
};

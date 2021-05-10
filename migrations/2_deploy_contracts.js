const Cryptokitties = artifacts.require("Cryptokitties");

module.exports = async function (deployer) {
  await deployer.deploy(Cryptokitties, "https://robohash.org");
  const game = await Cryptokitties.deployed();
  await Promise.all([game.mint(), game.mint(), game.mint(), game.mint()]);
};

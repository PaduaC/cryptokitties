const { expectRevert } = require("@openzeppelin/test-helpers");
const Game = artifacts.require("Cryptokitties.sol");

contract("Game", (accounts) => {
  let game;
  const [admin, player1] = [accounts[0], accounts[1]];

  beforeEach(async () => {
    game = await Game.new("https://url-to-your-game-server");
  });

  it("should NOT mint if not admin", async () => {
    await expectRevert(game.mint({ from: player1 }), "Admin only");
  });

  it("should mint if admin", async () => {
    await game.mint({ from: admin });
    const nextId = web3.utils.toBN(await game.nextId());
    assert(nextId.toNumber() === 1);
  });

  it("should breed", async () => {
    await game.mint({ from: admin });
    await game.mint({ from: admin });

    const kitty1 = web3.utils.toBN(0);
    const kitty2 = web3.utils.toBN(1);

    await game.breed(kitty1, kitty2);

    assert(kitty1.toNumber() === 0);
    assert(kitty2.toNumber() === 1);

    const babyKitten = await game.kitties.call(2);
    assert(babyKitten.id.toNumber() === 2);
  });
});

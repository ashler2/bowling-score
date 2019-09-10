const { expect } = require("chai");
const { Game } = require("../game");

describe("Testing a ScoreBoard for Bowling", () => {
  it("creates a new game object", () => {
    const game = new Game();
    expect(game).to.have.keys(
      "currentFrame",
      "frameRollNum",
      "frameScores",
      "scoreBoard",
      "maxPins",
      "remainingPins"
    );
    expect(game).to.be.a("object");
  });
  it("handles 1 frame of bowling", () => {
    const game = new Game();

    game.bowl(1);
    game.bowl(8);
    expect(game.curScore()).to.eql(9);
    console.log(game.scoreBoard, game.frameScores);
    expect(game.scoreBoard.length).to.eql(1);
  });
  it("handles 2 frames of bolwing", () => {
    const game = new Game();
    game.bowl(1);
    game.bowl(8);
    game.bowl(1);
    game.bowl(8);
    expect(game.curScore()).to.eql(18);
    expect(game.scoreBoard.length).to.eql(2);
  });
  it("can handle 20 1 rolls and final score works", () => {
    const game = new Game();
    for (let i = 0; i < 20; i++) {
      game.bowl(1);
    }

    expect(game.finalScore()).to.eql(20);
  });
  it("has a strike", () => {
    const game = new Game();
    game.bowl(10);
    game.bowl(2);
    game.bowl(2);
    game.bowl(2);
    game.bowl(2);
    expect(game.scoreBoard[0]).to.eql("Strike");
    expect(game.frameScores[0]).to.eql(14);
  });
  it("has a spare", () => {
    const game = new Game();
    game.bowl(5);
    game.bowl(5);
    game.bowl(2);
    game.bowl(2);
    game.bowl(2);
    game.bowl(2);
    expect(game.scoreBoard[0]).to.eql("Spare");
    expect(game.frameScores[0]).to.eql(12);
    // expect(game.frameScores).to.eql([12, 4, 4, 0]);
  });
  it("has 3 strikes in a row", () => {
    const game = new Game();
    game.bowl(10);
    game.bowl(10);
    game.bowl(10);
    game.bowl(2);
    game.bowl(2);
    expect(game.scoreBoard[0]).to.eql("Strike");
    expect(game.frameScores[0]).to.eql(30);
  });
  it("has a strike, spare, normal ", () => {
    const game = new Game();
    game.bowl(10);
    game.bowl(5);
    game.bowl(5);
    game.bowl(2);
    game.bowl(2);
    expect(game.scoreBoard[0]).to.eql("Strike");
    expect(game.scoreBoard[1]).to.eql("Spare");
    expect(game.frameScores[2]).to.eql(4);
  });
  it("has an extra role if strike on 10", () => {
    const game = new Game();
    for (let i = 0; i < 18; i++) {
      game.bowl(2);
    }
    game.bowl(10);
    game.bowl(10);
    expect(game.scoreBoard.length).to.eql(11);
  });
  it("has an extra role if spare on 10", () => {
    const game = new Game();
    for (let i = 0; i < 18; i++) {
      game.bowl(2);
    }
    console.log(game.frameScores);
    game.bowl(5);
    game.bowl(5);
    game.bowl(5);

    expect(game.finalScore()).to.eql(51);
  });
});

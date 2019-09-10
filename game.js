class Game {
  constructor() {
    this.frameScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.scoreBoard = [];
    this.maxPins = 10;
    this.currentFrame = 1;
    this.frameRollNum = 1;
    this.remainingPins = this.maxPins;
  }
  roundStart() {
    this.frameRollNum = 1;
    this.remainingPins = this.maxPins;
    this.currentFrame += 1;
  }

  bowl(pins) {
    const { frameRollNum, maxPins, remainingPins } = this;
    this.scoreIncrease(pins);
    frameRollNum === 1
      ? pins === maxPins
        ? this.scoreStrike() + this.roundStart()
        : this.scoreFirstRoll(pins)
      : (pins === remainingPins
          ? this.scoreSpare(pins)
          : this.scoreFrame(pins)) + this.roundStart();
  }
  scoreIncrease(pins) {
    const { currentFrame } = this;
    if (currentFrame <= 10) this.frameScores[currentFrame - 1] += pins;
  }
  scoreFrame(pins) {
    const { currentFrame, maxPins, remainingPins } = this;
    this.scoreBoard[currentFrame - 1] = maxPins - remainingPins + pins;
    this.strikeTrue(pins);
    this.frameIncrease();
  }

  frameIncrease() {
    this.frameRollNum += 1;
  }
  scoreFirstRoll(pins) {
    this.remainingPins -= pins;
    this.spareTrue(pins);
    this.strikeTrue(pins);
    this.frameIncrease();
  }
  scoreStrike() {
    const { scoreBoard, currentFrame, maxPins } = this;
    scoreBoard[currentFrame - 1] = "Strike";
    this.strikeTrue(maxPins);
    this.spareTrue(maxPins);
    this.frameIncrease();
  }

  strikeTrue(pins) {
    //add after 10 frames
    const { scoreBoard, currentFrame, frameRollNum } = this;
    if (
      scoreBoard[currentFrame - 3] === "Strike" &&
      scoreBoard[currentFrame - 2] === "Strike" &&
      frameRollNum === 1 &&
      currentFrame <= 10 + 2
    ) {
      this.frameScores[currentFrame - 3] += pins;
    }
    if (scoreBoard[currentFrame - 2] === "Strike" && currentFrame <= 10 + 1) {
      this.frameScores[currentFrame - 2] += pins;
    }
  }

  scoreSpare(pins) {
    this.scoreBoard[this.currentFrame - 1] = "Spare";
    this.strikeTrue(pins);
    this.frameIncrease();
  }

  spareTrue(pins) {
    const { scoreBoard, currentFrame } = this;
    if (scoreBoard[currentFrame - 2] === "Spare") {
      this.frameScores[currentFrame - 2] += pins;
    }
  }

  finalScore() {
    if (this.currentFrame === 10) {
      throw new Error("score only availbee at end");
    }
    return this.frameScores.reduce((a, b) => a + b, 0);
  }
  curScore() {
    return this.frameScores.reduce((a, b) => a + b, 0);
  }
}
module.exports = { Game };
// export default Game;

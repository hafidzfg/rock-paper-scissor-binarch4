const resultWin = document.querySelector(".you-win");
const resultDraw = document.querySelector(".draw");
const resultLose = document.querySelector(".pc-win");
const initialVS = document.querySelector(".init");

class Result {
  static whoWin(yourChoice, PCchoice) {
    if (
      (yourChoice === "rock" && PCchoice === "scissors1") ||
      (yourChoice === "scissors" && PCchoice === "paper1") ||
      (yourChoice === "paper" && PCchoice === "rock1")
    ) {
      resultWin.style.display = "flex";
      resultDraw.style.display = "none";
      resultLose.style.display = "none";
      initialVS.style.display = "none";
      return "win";
    } else if (
      (yourChoice === "scissors" && PCchoice === "rock1") ||
      (yourChoice === "paper" && PCchoice === "scissors1") ||
      (yourChoice === "rock" && PCchoice === "paper1")
    ) {
      resultWin.style.display = "none";
      resultDraw.style.display = "none";
      resultLose.style.display = "flex";
      initialVS.style.display = "none";
      return "lose";
    } else {
      resultWin.style.display = "none";
      resultDraw.style.display = "flex";
      resultLose.style.display = "none";
      initialVS.style.display = "none";
      return "draw";
    }
  }
}

class Choice {
  constructor(yourChoice) {
    this.yourChoice = yourChoice;
    this.PCchoice = this.drawPcChoice();
  }

  getYourChoice = () => this.yourChoice;
  getPcChoice = () => this.PCchoice;

  drawPcChoice() {
    const options = ["rock1", "paper1", "scissors1"];
    return options[Math.floor(Math.random() * options.length)];
  }
}

class Stats {
  constructor(wins, draws, loses) {
    this.status = {
      wins: wins,
      draws: draws,
      loses: loses,
    };
  }
  getStats = () => this.status;

  refreshStats(result) {
    switch (result) {
      case "win":
        console.log("PLAYER 1 WIN");
        break;
      case "draw":
        console.log("DRAW");
        break;
      case "lose":
        console.log("COM WIN");
        break;
    }
  }
}

class Game {
  constructor() {
    this.optionsImg = document.querySelectorAll("input");
    this.optionsBtns = document.querySelectorAll("input");
    this.optionsBtns.forEach((option) =>
      option.addEventListener("click", this.startGame.bind(this))
    );
    this.youWins = document.querySelector(".results > .you-win");
    this.draw = document.querySelector(".results > .draw");
    this.PcWins = document.querySelector(".results > .pc-win");

    this.stats = new Stats(0, 0, 0);
  }

  startGame(e) {
    this.optionsImg.forEach((choice) => (choice.className = "img"));
    if (this.draw.classList.contains("draw-animation")) {
      this.draw.classList.toggle("draw-animation");
    }

    this.choice = new Choice(e.target.dataset.option);

    const yourChoice = this.choice.getYourChoice(),
      PcChoice = this.choice.getPcChoice();

    if (yourChoice === PcChoice) {
      [...this.optionsImg]
        .find(
          (choice) =>
            choice.dataset.option === PcChoice &&
            choice.dataset.option === PcChoice
        )
        .classList.add("draw-color");
      this.draw.classList.toggle("draw-animation");
    } else {
      [...this.optionsImg]
        .find((choice) => choice.dataset.option === yourChoice)
        .classList.add("player-choice");
      [...this.optionsImg]
        .find((choice) => choice.dataset.option === PcChoice)
        .classList.add("pc-choice");
    }

    this.stats.refreshStats(Result.whoWin(yourChoice, PcChoice));
    console.log(`Player memilih: ${yourChoice}`);
  }
}

const newGame = new Game();

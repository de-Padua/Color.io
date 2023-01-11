let score = 0;
let sec = 10;
class Game {
  //get blocks
  getAllBlocks() {
    const blocks = [...document.querySelectorAll(".col")];
    this.colorsRandomizeBlocks(blocks);
    this.timer(blocks);
  }
  timer(blocks) {
    console.log(blocks);
    const start = document.querySelector("#start");
    const timeDomEL = document.querySelector(".remaing-time");
    let con =  setInterval(() => {
        if (sec < 1) {
          blocks.forEach((block) => {
            start.disabled = false;
            clearInterval(con)
          });
        } else {
          sec = sec - 1;
          timeDomEL.innerText = sec;
        

        }
      }, 1000);
  }
  //random block
  colorsRandomizeBlocks(blocks) {
    //score container
    const scoreDomEl = document.querySelector(".score");
    const dificult = Math.floor(Math.random() * 15);
    if (dificult < 10) {
      console.log("HARD");
    } else {
      console.log("easy");
    }

    //color randomizer
    let h = Math.floor(Math.random() * 300);
    let s = Math.floor(Math.random() * 100);
    let a = Math.floor(Math.random() * 80);

    const corret_block = document.querySelector(".corret-block");
    let id = Math.floor(Math.random() * 16 + 1);
    let selectedSquare = blocks.find((block) => {
      return block.dataset.id === id.toString();
    });

    //set random color
    selectedSquare.style.background = `hsla(${h}, ${s}%, ${a}%, 1)`;
    //set colors to others blocks
    blocks.forEach((block) => {
      if (block.dataset.id != id) {
        block.style.background = `hsla(${h + dificult}, ${s}%, ${a}%, 1)`;
      }
    });
    //corret block color
    corret_block.style.background = `hsla(${h}, ${s}%, ${a}%, 1)`;
    corret_block.disabled = true;

    blocks.forEach((block) => {
      block.addEventListener("click", () => {
        if (
          block.attributes.style.value === corret_block.attributes.style.value
        ) {
          this.colorsRandomizeBlocks(blocks);
          sec = sec + 3;
          score = score + 10;
          scoreDomEl.innerText = score;
        }
      });
    });
  }
}
class Storage {
  static setUserScore() {
    localStorage.setItem("scores", JSON.stringify(products));
  }
  static getUserScore() {
    return localStorage.getItem("scores")
      ? JSON.parse(localStorage.getItem("scores"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();

  const start = document.querySelector("#start");
  start.addEventListener("click", () => {
    start.disabled = true;
    sec = 10;
    score = 0;
    game.getAllBlocks();
  });
});

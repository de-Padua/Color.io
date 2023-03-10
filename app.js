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
    let con = setInterval(() => {
      if (sec < 1) {
        blocks.forEach((block) => {
          block.classList.add = "disabled";
          start.disabled = false;
          clearInterval(con);
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

    //color randomizer
    let h = Math.floor(Math.random() * 300);
    let s = Math.floor(Math.random() * 100);
    let a = Math.floor(Math.random() * 80);

    //find the block with the correct id
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
        block.style.background = `hsla(${
          h + this.dificulty()
        }, ${s}%, ${a}%, 1)`;
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
        else {
           
        }
      });
    });
  }

  dificulty() {
    const dificultyDomEl = document.querySelector(".dificulty");

    let easy = 25;
    let mid = 15;
    let hard = 10;
    let extreme = 2;

    if (score < 50) {
      dificultyDomEl.innerText = "Easy";
      dificultyDomEl.style.color = "green";
      return easy;
    } else if (score < 100) {
      dificultyDomEl.innerText = "Medium";
      dificultyDomEl.style.color = "blue";
      return mid;
    } else if (score < 150) {
      dificultyDomEl.innerText = "Hard";
      dificultyDomEl.style.color = "red";

      return hard;
    } else if (score < 200) {
      dificultyDomEl.innerText = "Impossible";
      dificultyDomEl.style.color = "black";

      return extreme;
    }
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

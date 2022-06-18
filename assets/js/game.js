import { listShuffle } from "./list_cards.js";
/* Création d'une classe appelée Game. */
export default class Game {
  constructor() {
    this.params = {
      cardArea: document.querySelector("#card_area"),
      imageCompare: [],
      indexImg: [],
      verso: "url('./assets/images/verso.png')",
    };

    this.init();
  }

  /* Une fonction qui est appelée lorsque la page est chargée. */
  init = () => {
    window.addEventListener("load", () => {
      this.createCard();
      this.play();
    });
  };

  /* Création d'une carte pour chaque élément du tableau listShuffle. */
  createCard = () => {
    for (let index = 0; index < listShuffle.length; index++) {
      let card = document.createElement("div");
      card.className = "card";
      card.classList.add("visible");
      this.params.cardArea.appendChild(card);
      let imageRecto = document.createElement("img");
      imageRecto.className = "recto";
      card.appendChild(imageRecto);
    }
  };

  play = () => {
    let cards = document.querySelectorAll(".card");
    cards.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        e.target.firstChild.src = listShuffle[index].image;
        // let name = listShuffle[index].name;
        // element.setAttribute("data-digimon", name);
        let source = e.target.firstChild.src;
        element.id = index;
        element.style.backgroundImage = "none";
        if (this.params.imageCompare.length < 2) {
          this.params.indexImg.push(element.id);
          this.params.imageCompare.push(source);
        }
        if (this.params.imageCompare.length === 2) {
          setTimeout(() => {
            this.checkCards(this.params.imageCompare, this.params.indexImg);
          }, 650);
        }
      });
    });
  };

  checkCards = (imageCompare, indexImg) => {
    if (imageCompare[0] === imageCompare[1] && indexImg[0] != indexImg[1]) {
      let element1 = document.getElementById(`${indexImg[0]}`);
      let element2 = document.getElementById(`${indexImg[1]}`);
      element1.classList.remove("visible");
      element1.classList.add("hidden");
      element2.classList.remove("visible");
      element2.classList.add("hidden");
      element1.removeEventListener("click", this.flipCard);
      element2.removeEventListener("click", this.flipCard);
      this.params.imageCompare = [];
      this.params.indexImg = [];
    } else {
      this.flipCard(indexImg);
      this.params.imageCompare = [];
      this.params.indexImg = [];
    }
  };

  flipCard = (indexImg) => {
    let cards = document.querySelectorAll(".card");
    for (let index = 0; index < cards.length; index++) {
      // let element1 = document.getElementById(`${indexImg[0]}`);
      cards[index].style.backgroundImage = this.params.verso;
    }
    this.removeSource(indexImg);
  };

  removeSource = (indexImg) => {
    let element1 = document.getElementById(`${indexImg[0]}`);
    let element2 = document.getElementById(`${indexImg[1]}`);
    element1.firstChild.src = "";
    element2.firstChild.src = "";
  };
}

/* Création d'une nouvelle instance de la classe Game. */
const game = new Game();

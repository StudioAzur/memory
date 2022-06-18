import { listShuffle } from "./list_cards.js";
/* Création d'une classe appelée Game. */
export default class Game {
  constructor() {
    this.params = {
      cardArea: document.querySelector("#card_area"),
      imageCompare: [],
      indexImg: [],
      cardPair: [],
      verso: "url('./assets/images/verso.png')",
      timer: document.querySelector("#timer"),
      myTimer: setInterval(this.reductTime, 1000),
      chrono: 90,
      restart: document.querySelector("#restart")
    };

    this.init();
  }

  /* Une fonction qui est appelée lorsque la page est chargée. */
  init = () => {
    window.addEventListener("load", () => {
      this.params.restart.disabled = true;
      this.createCard();
      this.play();
      this.timer();
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

/* Ajout d'un écouteur d'événement à chaque carte. Lorsque la carte est cliquée, l'image est remplacée
par l'image du digimon au même index dans le tableau listShuffle. La source de l'image est stockée
dans le tableau imageCompare. Si le tableau imageCompare comporte deux éléments, la fonction
checkCards est appelée. */
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
          }, 600);
        }
      });
    });
  };

  /* C'est une fonction qui est appelée toutes les secondes. Il réduit le temps de 1 seconde. */
  reductTime = () => {
    let minutes = parseInt(this.params.chrono / 60, 10);
    let secondes = parseInt(this.params.chrono % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;
    this.params.timer.textContent = minutes + ":" + secondes;
    this.params.chrono = this.params.chrono <= 0 ? 0 : this.params.chrono - 1;
    if(this.params.chrono === 0 || this.params.cardPair.length == listShuffle.length / 2){
      this.params.restart.disabled = false;
      this.params.restart.addEventListener("click", this.reload);
      clearInterval(this.params.myTimer);
      this.checkWin();
    }
  };

  reload = ()=> {
    window.location.reload();
  }

/* Fonction appelée toutes les secondes. Il réduit le temps de 1 seconde. */
  timer = () => {  
    this.params.myTimer;
  };

  /* Vérifier si les deux cartes sont identiques et si elles ne sont pas identiques, il les retourne. */
  checkCards = (imageCompare, indexImg) => {
    if (imageCompare[0] === imageCompare[1] && indexImg[0] != indexImg[1]) {
      let element1 = document.getElementById(`${indexImg[0]}`);
      let element2 = document.getElementById(`${indexImg[1]}`);
      this.params.cardPair.push(imageCompare[0]);
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

 /* Fonction appelée lorsque les deux cartes ne sont pas identiques. Il retourne les cartes. */
  flipCard = (indexImg) => {
    let cards = document.querySelectorAll(".card");
    for (let index = 0; index < cards.length; index++) {
      cards[index].style.backgroundImage = this.params.verso;
    }
    this.removeSource(indexImg);
  };

  /* Suppression de la source de l'image. */
  removeSource = (indexImg) => {
    let element1 = document.getElementById(`${indexImg[0]}`);
    let element2 = document.getElementById(`${indexImg[1]}`);
    element1.firstChild.src = "";
    element2.firstChild.src = "";
  };

 /* Vérifier si le jeu est gagné ou perdu. */
  checkWin = () => {
    if(this.params.chrono == 0){
      this.params.timer.textContent = "";
      this.params.timer.textContent = "Le Digimonde est perdu !";
    }
    if (this.params.cardPair.length == listShuffle.length / 2) {
      this.params.timer.textContent = "";
      this.params.timer.textContent = "Gagné ! Tu as sauvé le Digimonde !";
    }
  };
}

/* Création d'une nouvelle instance de la classe Game. */
const game = new Game();

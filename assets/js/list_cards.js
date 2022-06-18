import Card from "./card.js";

const card1 = new Card("./assets/images/agumon.png", "Agumon");
const card2 = new Card("./assets/images/biyomon.png", "Biyomon");
const card3 = new Card("./assets/images/gabumon.png", "Gabumon");
const card4 = new Card("./assets/images/gatomon.png", "Gatomon");
const card5 = new Card("./assets/images/gomamon.png", "Gomamon");
const card6 = new Card("./assets/images/palmon.png", "Palmon");
const card7 = new Card("./assets/images/patamon.png", "Patamon");
const card8 = new Card("./assets/images/tentomon.png", "Tentomon");

const listCards = [card1, card2, card3, card4, card5, card6, card7, card8];

const listDigimon = listCards.concat(listCards);

/**
 * Il renvoie un nombre aléatoire entre 0 et le nombre transmis.
 * @param max - Le nombre maximum que vous souhaitez générer.
 * @returns Une fonction qui prend un nombre et renvoie un nombre aléatoire entre 0 et ce nombre.
 */
const random = (max) => {
  return Math.floor(Math.random() * max);
};

/**
 * Il prend un tableau de 16 éléments et renvoie un nouveau tableau de 16 éléments, où les éléments
 * sont dans un ordre différent.
 * @param listDigimon - la liste des digimon qui seront randomisés
 * @returns un nouveau tableau avec 16 éléments.
 */
const shuffle = (listDigimon) => {
  let originalList = listDigimon;
  let randomizeDigimon = [];
  for (let index = 0; index < 16; index++) {
    let randomize = random(originalList.length - 1);
    let elementRandom = originalList[randomize];
    originalList.splice(randomize, 1);
    randomizeDigimon.push(elementRandom);
  }
  return randomizeDigimon;
};

export const listShuffle = shuffle(listDigimon);

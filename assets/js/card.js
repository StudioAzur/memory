export default class Card {
  /* Une propriété statique de la classe. Ce n'est pas une propriété d'instance. C'est une propriété de
  la classe elle-même. */
  static generateId = 0;
  /**
   * La fonction constructeur crée un nouvel objet avec les propriétés id, name, image, class, pair et
   * active.
   * @param image - l'image de la carte
   * @param name - le nom de la carte
   */
  constructor(image, name) {
    this.id = Card.generateId++,
    this.name = name,
    this.image = image
  }
}

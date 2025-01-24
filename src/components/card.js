import createImageUrl from "../utils/createImageUrl"
class Card {
  imageUrl
  dom

  constructor(imageUrl) {
    this.createDom()
    this.addImageUrl(imageUrl)
  }

  addImageUrl = (imageUrl) => {
    this.imageUrl = imageUrl
    this.dom.style.backgroundImage = createImageUrl(imageUrl)
  }

  createDom = () => {
    this.dom = document.createElement("div")
    this.dom.classList.add('card')
  }

  setDisplay = (display = "block") => {
    this.dom.style.display = display
  }
}

class CardGroup {
  static instance
  cardList = []
  dom

  constructor() {
    if (CardGroup.instance) {
      return CardGroup.instance
    }
    CardGroup.instance = this
    this.createDom()
  }

  createDom = () => {
    this.dom = document.createElement("div")
    this.dom.classList.add("card-grp")
  }

  clear = () => {
    this.cardList.forEach(item => {
      this.dom.removeChild(item.dom)
    })
    cardList = []
  }

  add = (card) => {
    if (card && card.dom) {
      this.dom.appendChild(card.dom)
      this.cardList = this.cardList.filter(item => item.dom !== card.dom)
      this.cardList.push(card)
    }
  }

  addFirst = (card) => {
    if (card && card.dom) {
      this.dom.insertBefore(card.dom, this.cardList[0].dom)
      this.cardList = this.cardList.filter(item => item.dom !== card.dom)
      this.cardList.unshift(card)
    }
  }

  remove = (card) => {
    if (card && card.dom) {
      this.cardList = this.cardList.filter(item => item.dom !== card.dom)
      this.dom.removeChild(card.dom)
    }
  }

  setDisplay = (index) => {
    this.cardList[index].setDisplay('none')
  }
}


export { Card, CardGroup }
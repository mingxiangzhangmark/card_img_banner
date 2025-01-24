import "./css/style.scss"
import data from "../data/db.json"
import Background from "./components/background"
import { Button, ButtonGroup } from "./components/button"
import { Card, CardGroup } from "./components/card"

const body = document.querySelector('body')
const images = data.images;
const buttons = data.buttons;

let background = new Background(images[1].address)
body.appendChild(background.dom)

let background2 = new Background(images[0].address)
body.appendChild(background2.dom)

const buttonGroup = new ButtonGroup()
body.appendChild(buttonGroup.dom)

buttons.forEach(btnInfo => {
  const button = new Button(btnInfo.classList)
  buttonGroup.add(button)
})


const cardGroup = new CardGroup()
body.appendChild(cardGroup.dom)


images.forEach((imageInfo, index) => {
  const card = new Card(imageInfo.address)
  cardGroup.add(card)
})


const left = document.querySelector('.left')
const right = document.querySelector('.right')

let buttonWorkFlag = false

const backgroundChange = () => {
  body.insertBefore(background2.dom, background.dom)
  let middleBackground = background2
  background2 = background
  background = middleBackground

  background.dom.classList.remove('backgroundOut')
  background2.dom.classList.remove('backgroundIn')
}

const leftClick = () => {
  if (buttonWorkFlag) {
    return;
  }
  buttonWorkFlag = true
  background2.dom.classList.add('backgroundOut')
  background.dom.classList.add('backgroundIn')

  cardGroup.add(cardGroup.cardList[0])

  setTimeout(() => {
    backgroundChange()

    background.addImageUrl(cardGroup.cardList[1].imageUrl)
    background2.addImageUrl(cardGroup.cardList[0].imageUrl)
    buttonWorkFlag = false
  }, 500);
}

const rightClick = () => {
  if (buttonWorkFlag) {
    return;
  }
  buttonWorkFlag = true
  background.addImageUrl(cardGroup.cardList[cardGroup.cardList.length - 1].imageUrl)

  background2.dom.classList.add('backgroundOut')
  background.dom.classList.add('backgroundIn')

  cardGroup.addFirst(cardGroup.cardList[cardGroup.cardList.length - 1])

  setTimeout(() => {
    backgroundChange()
    background.addImageUrl(cardGroup.cardList[1].imageUrl)
    background2.addImageUrl(cardGroup.cardList[0].imageUrl)
    buttonWorkFlag = false
  }, 500)
}

let duration = 4000

let interval = setInterval(() => {
  leftClick()
}, duration)

left.addEventListener('click', () => {
  leftClick()
  clearInterval(interval)
  interval = setInterval(() => {
    leftClick()
  }, duration)
})

right.addEventListener('click', () => {
  rightClick()
  clearInterval(interval)
  interval = setInterval(() => {
    leftClick()
  }, duration)
})


class Button {
  classList = []
  dom

  constructor(classList = []) {
    this.classList = classList
    this.createDom()
  }

  createDom = () => {
    this.dom = document.createElement("div")
    this.dom.classList.add('btn')
    this.dom.classList.add(...this.classList)
  }
}

class ButtonGroup {
  static instance
  buttonList = []
  dom

  constructor() {
    if (ButtonGroup.instance) {
      return ButtonGroup.instance
    }
    ButtonGroup.instance = this
    this.createDom()
  }

  createDom = () => {
    this.dom = document.createElement("div")
    this.dom.classList.add("btn-grp")
  }

  clear = () => {
    this.buttonList.forEach(item => {
      this.dom.removeChild(item.dom)
    })
    buttonList = []
  }

  add = (button) => {
    if (button && button.dom) {
      this.dom.appendChild(button.dom)
      this.buttonList.push(button)
    }
  }

  remove = (button) => {
    if (button && button.dom) {
      this.buttonList.filter(item => item.dom === button.dom)
      this.dom.removeChild(button.dom)
    }
  }
}


export { Button, ButtonGroup }
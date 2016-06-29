module Dennin {

  export class Splite {

    static create(rect: Rect): Splite {
      return new Splite(rect)
    }

    element: HTMLElement

    rect: Rect

    accel: Accel = {
      x: 0,
      y: 0
    }

    status: SpliteStatus = {
      isMovingX: false,
      isLanding: false,
      isJumping: false,
      isFloating: true
    }

    constructor(rect: Rect) {
      this.element = document.createElement(Dennin.config.nodeName)
      this.rect = rect
      this.setStyle()
    }

    setStyle(): void {
      this.element.style.left = `${this.rect.position.x}px`
      this.element.style.top = `${this.rect.position.y}px`
      this.element.style.width = `${this.rect.size.width}px`
      this.element.style.height = `${this.rect.size.height}px`
    }

    on(eventName: string, f: EventListener): Splite {
      this.element.addEventListener(eventName, f)
      return this
    }

    off(eventName: string, f: EventListener): Splite {
      this.element.removeEventListener(eventName, f)
      return this
    }

    dispatch(eventName: string, option?: any): Splite {
      const e = new CustomEvent(eventName, {
        detail: option
      })
      this.element.dispatchEvent(e)
      return this
    }

    kill(): void {
      Dennin.removeSplite(this)
    }

    run(): void {
      this.loop()
      this.update()
    }

    update(): void {
      this.setStyle()
    }

    collision(): void {
      this.collisionWindow()
      this.collisionElements()
    }

    collisionWindow(): void {
      let rect = this.rect
      let isCollided = false
      if (rect.position.x < 0) {
        rect.position.x = 0
        isCollided = true
      }
      if (rect.position.x + rect.size.width > window.innerWidth) {
        rect.position.x = window.innerWidth - rect.size.width
        isCollided = true
      }
      this.rect = rect
      if (isCollided) {
        this.dispatch(Dennin.enums.SpliteEvent.OnCollisionWindow.code)
      }
    }

    collisionElements(): void {
      this.status.isFloating = true
      const cllideX = Dennin.getDoms().filter(dom => {
        const collisionLX = this.rect.position.x <= dom.offsetLeft + dom.offsetWidth
        const collisionRX = this.rect.position.x + this.rect.size.width >= dom.offsetLeft
        return collisionLX || collisionRX
        // const collisionTY = this.rect.position.y <= dom.offsetTop + dom.offsetHeight
        // const collisionBY = this.rect.position.y + this.rect.size.height >= dom.offsetTop
        // const collisionY = collisionTY || collisionBY
        //
        // return true
      })
    }

    loop(): void {}
    goLeft(): void {}
    goRight(): void {}
    doJump(): void {}
    doFall(): void {}
    doAttack(): void {}
    stopLeft(): void {}
    stopRight(): void {}
    stopJump(): void {}
    landing(): void {}
    floating(): void {}
    onOver(): void {}
    onMouseMove(): void {}
  }
}

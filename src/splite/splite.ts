module Dennin {

  export class Splite {

    static create(rect: Rect): Splite {
      return new Splite(rect)
    }

    private helper: SpliteHelper

    element: HTMLElement
    rect: Rect

    constructor(rect: Rect) {
      this.element = document.createElement(Config.NodeName)
      this.helper = new SpliteHelper()
      this.rect = rect
      this.initStyle()

      document.getElementsByTagName('body')[0].appendChild(this.element)
    }

    initStyle(): void {
      this.element.classList.add(Config.classNames.spliteBase)
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

    run(): void {}
    update(): void {}
    kill(): void {}

    goLeft(): void {}
    goRight(): void {}
    doJump(): void {}
    doFall(): void {}
    doAttack(): void {}
    stopLeft(): void {}
    stopRight(): void {}
    stopJump(): void {}
  }
}

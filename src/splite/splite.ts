module Dennin {

  export class Splite {

    static create(rect: Rect): Splite {
      let element = document.createElement('splite')
      let splite = new Splite(element)
      splite.rect = rect

      return splite
    }

    helper: SpliteHelper

    element: Element
    rect: Rect

    constructor(element: Element) {
      this.element = element
      this.helper = new SpliteHelper()
    }

    on(eventName: string, f: Function): void {}
    off(eventName: string): void {}
    dispatch(eventName: string): void {}

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

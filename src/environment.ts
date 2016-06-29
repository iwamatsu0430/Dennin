module Dennin {

  export class Environment {

    bodyDoms: HTMLElement[]

    constructor() {
      this.setupStyle()
      this.addGlobalKeyEvent()
    }

    setupStyle(): void {
      let style = document.createElement('style')
      style.innerHTML = `
        ${Dennin.config.nodeName} {
          position: fixed;
          background-color: red; // FIXME: temp style for debug
        }
      `
      document.getElementsByTagName('head')[0].appendChild(style)
    }

    addGlobalKeyEvent(): void {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        this.bodyDoms.forEach(dom => {
          if (dom.nodeName !== Dennin.config.nodeName) {
            return
          }
          dom.dispatchEvent(new CustomEvent(Dennin.enums.SpliteEvent.OnKeyDown.code, {detail: e.keyCode}))
        })
      })
      document.addEventListener('keyup', (e: KeyboardEvent) => {
        this.bodyDoms.forEach(dom => {
          if (dom.nodeName !== Dennin.config.nodeName) {
            return
          }
          dom.dispatchEvent(new CustomEvent(Dennin.enums.SpliteEvent.OnKeyUp.code, {detail: e.keyCode}))
        })
      })
    }

    reload(): void {
      const doms = document.querySelectorAll("body *")
      this.bodyDoms = Array.prototype.slice.call(doms)
    }

    add(dom: HTMLElement): void {
      this.bodyDoms.push(dom)
    }

    remove(dom: HTMLElement): void {
      const index = this.bodyDoms.indexOf(dom)
      if (index >= 0) {
        this.bodyDoms.splice(index, 1)
      }
    }
  }
}

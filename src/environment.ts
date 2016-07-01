module Dennin {

  export class Environment {

    isRunningClock: boolean = false

    splites: Splite[] = []

    bodyElements: HTMLElement[] = []

    constructor() {
      this.setupStyle()
      this.addGlobalKeyEvent()
      this.startClock()
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
        this.splites.forEach(splite => {
          splite.dispatch(Dennin.enums.SpliteEvent.OnKeyDown.code, e.keyCode)
        })
      })
      document.addEventListener('keyup', (e: KeyboardEvent) => {
        this.splites.forEach(splite => {
          splite.dispatch(Dennin.enums.SpliteEvent.OnKeyUp.code, e.keyCode)
        })
      })
    }

    startClock(): void {
      this.isRunningClock = true
      const f = () => {
        this.splites.forEach((splite: Splite) => splite.run())
        if (this.isRunningClock) {
          setTimeout(f, 1000 / Dennin.config.fps)
        }
      }
      f()
    }

    stopClock(): void {
      this.isRunningClock = false
    }

    reload(): void {
      const doms = document.querySelectorAll("body *")
      this.bodyElements = Array.prototype.slice.call(doms)
    }

    add(dom: HTMLElement): void {
      this.bodyElements.push(dom)
    }

    addSplite(splite: Splite): void {
      this.splites.push(splite)
      this.bodyElements.push(splite.element)
      document.getElementsByTagName('body')[0].appendChild(splite.element)
    }

    remove(dom: HTMLElement): void {
      const index = this.bodyElements.indexOf(dom)
      if (index >= 0) {
        this.bodyElements.splice(index, 1)
      }
    }

    removeSplite(splite: Splite): void {
      const index = this.splites.indexOf(splite)
      if (index >= 0) {
        splite.element.parentNode.removeChild(splite.element)
        this.splites.splice(index, 1)
        this.remove(splite.element)
      }
    }
  }
}

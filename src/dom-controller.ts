module Dennin {

  export class DOMController {

    bodyDoms: HTMLElement[]

    constructor() {}

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

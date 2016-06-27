module Dennin {

  export class DOMController {

    bodyDoms: Element[]

    constructor() {}

    reload(): void {
      const doms = document.querySelectorAll("body *")
      this.bodyDoms = Array.prototype.slice.call(doms)
    }

    add(dom: Element): void {
      this.bodyDoms.push(dom)
    }

    remove(dom: Element): void {
      const index = this.bodyDoms.indexOf(dom)
      if (index >= 0) {
        this.bodyDoms.splice(index, 1)
      }
    }
  }
}

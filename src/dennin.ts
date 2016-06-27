module Dennin {

  let domController: DOMController

  function initDomController(): void {
    if (domController === null || domController === undefined) {
      domController = new DOMController()
    }
  }

  export function loadDOMs(): void {
    initDomController()
    domController.reload()
  }

  export function create(rect: Rect = {position: {x: 0, y: 0}, size: {width: 100, height: 100}}): Splite {
    initDomController()
    const newCaharacter = Splite.create(rect)
    domController.add(newCaharacter.element)
    return newCaharacter
  }

  export function getDoms(): Element[] {
    initDomController()
    return domController.bodyDoms
  }

  export function bookmarklet(): void {
    loadDOMs()
    create()
  }
}

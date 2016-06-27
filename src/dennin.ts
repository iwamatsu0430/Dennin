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

  export function create(position: Position = {x: 0, y: 0}): Splite {
    initDomController()
    let size = {width: 100, height: 100}
    const newCaharacter = Splite.create(position, size)
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

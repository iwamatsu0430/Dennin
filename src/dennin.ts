/// <reference path="./dom-controller.ts" />

module Dennin {

  let domController: DOMController

  export function init(): void {
    if (domController === undefined) {
      domController = new DOMController()
    }

    // FIXME
    // add style
    let style = document.createElement('style')
    style.innerHTML = `
      .${Config.classNames.spliteBase} {
        position: fixed;
        background-color: red; // FIXME: temp style for debug
      }
    `
    document.getElementsByTagName('head')[0].appendChild(style)

    // FIXME
    // add global event
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      domController.bodyDoms.forEach(dom => {
        if (dom.nodeName !== Config.NodeName) {
          return
        }
        dom.dispatchEvent(new CustomEvent(SpliteEvent[SpliteEvent.OnKeyDown], {detail: e.keyCode}))
      })
    })
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      domController.bodyDoms.forEach(dom => {
        if (dom.nodeName !== Config.NodeName) {
          return
        }
        dom.dispatchEvent(new CustomEvent(SpliteEvent[SpliteEvent.OnKeyUp], {detail: e.keyCode}))
      })
    })
  }

  export function loadDOMs(): void {
    domController.reload()
  }

  export function create(rect: Rect = {position: {x: 0, y: 0}, size: {width: 32, height: 32}}): PlayableSplite {
    const splite = PlayableSplite.create(rect)
    domController.add(splite.element)
    return splite
  }

  export function getDoms(): HTMLElement[] {
    return domController.bodyDoms
  }

  export function bookmarklet(): void {
    loadDOMs()
    create()
  }
}

Dennin.init()

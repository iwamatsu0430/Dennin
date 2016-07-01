/// <reference path="./config.ts"/>
/// <reference path="./enums.ts"/>
/// <reference path="./environment.ts"/>

module Dennin {

  export let config: Config

  export let enums: Enums

  let environment: Environment

  export function init(): void {
    if (config === undefined) {
      config = new Config()
    }
    if (enums === undefined) {
      enums = new Enums()
    }
    if (environment === undefined) {
      environment = new Environment()
    }
  }

  export function loadDOMs(): void {
    environment.reload()
  }

  export function createDennin(rect: Rect = {position: {x: 0, y: 0}, size: {width: 32, height: 32}}): SpliteDennin {
    const splite = SpliteDennin.create(rect)
    environment.addSplite(splite)
    return splite
  }

  export function removeSplite(splite: Splite): void {
    environment.removeSplite(splite)
  }

  export function getElements(): HTMLElement[] {
    return environment.bodyElements
  }

  export function bookmarklet(): void {
    loadDOMs()
    createDennin()
  }
}

Dennin.init()

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

  export function create(rect: Rect = {position: {x: 0, y: 0}, size: {width: 32, height: 32}}): PlayableSplite {
    const splite = PlayableSplite.create(rect)
    environment.add(splite.element)
    return splite
  }

  export function getDoms(): HTMLElement[] {
    return environment.bodyDoms
  }

  export function bookmarklet(): void {
    loadDOMs()
    create()
  }
}

Dennin.init()

module Dennin {

  export interface Position {
    x: number
    y: number
  }

  export interface Size {
    width: number
    height: number
  }

  export interface KeyConfig {
    goLeft: number,
    goRight: number,
    doJump: number,
    doFall: number,
    doAttack: number
  }
}

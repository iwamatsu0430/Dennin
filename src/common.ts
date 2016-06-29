module Dennin {

  interface XYNumber {
    x: number
    y: number
  }

  interface WHNumber {
    width: number
    height: number
  }

  export interface Position extends XYNumber {}

  export interface Size extends WHNumber {}

  export interface Rect {
    position: Position
    size: Size
  }

  export interface Accel extends XYNumber {}

  export interface SpliteStatus {
    isMovingX: boolean
    isLanding: boolean
    isJumping: boolean
    isFloating: boolean
  }

  export interface KeyConfig {
    goLeft: number,
    goRight: number,
    doJump: number,
    doFall: number,
    doAttack: number
  }
}

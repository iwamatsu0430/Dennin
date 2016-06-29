/// <reference path="./splite.ts" />

module Dennin {

  export class SplitePlayable extends Splite {

    static create(rect: Rect): SplitePlayable {
      return new SplitePlayable(rect)
    }

    keyConfig: KeyConfig

    constructor(rect: Rect) {
      super(rect)
      this.addKeyEvent()
    }

    addKeyEvent(): void {
      this.on(Dennin.enums.SpliteEvent.OnKeyDown.code, (e: CustomEvent) => {
        if (this.keyConfig === null || this.keyConfig === undefined) {
          return
        }
        const keyCode = e.detail
        if (keyCode === this.keyConfig.goLeft) {
          this.goLeft()
          this.dispatch(Dennin.enums.SpliteEvent.OnGoLeft.code)
        } else if (keyCode === this.keyConfig.goRight) {
          this.goRight()
          this.dispatch(Dennin.enums.SpliteEvent.OnGoRight.code)
        } else if (keyCode === this.keyConfig.doJump) {
          this.doJump()
          this.dispatch(Dennin.enums.SpliteEvent.OnDoJump.code)
        } else if (keyCode === this.keyConfig.doFall) {
          this.doFall()
          this.dispatch(Dennin.enums.SpliteEvent.OnDoFall.code)
        } else if (keyCode === this.keyConfig.doAttack) {
          this.doAttack()
          this.dispatch(Dennin.enums.SpliteEvent.OnDoAttack.code)
        }
      })
      this.on(Dennin.enums.SpliteEvent.OnKeyUp.code, (e: CustomEvent) => {
        if (this.keyConfig === null || this.keyConfig === undefined) {
          return
        }
        const keyCode = e.detail
        if (keyCode === this.keyConfig.goLeft) {
          this.stopLeft()
          this.dispatch(Dennin.enums.SpliteEvent.OnStopLeft.code)
        } else if (keyCode === this.keyConfig.goRight) {
          this.stopRight()
          this.dispatch(Dennin.enums.SpliteEvent.OnStopRight.code)
        } else if (keyCode === this.keyConfig.doJump) {
          this.stopJump()
          this.dispatch(Dennin.enums.SpliteEvent.OnStopJump.code)
        }
      })
    }

    setDefaultKeyConfig(): Splite {
      return this.setKeyConfig(Dennin.config.defaultKeyConfig)
    }

    setKeyConfig(newKeyConfig: KeyConfig): Splite {
      this.keyConfig = newKeyConfig
      return this
    }
  }
}

/// <reference path="./splite.ts" />

module Dennin {

  export class PlayableSplite extends Splite {

    static create(rect: Rect): PlayableSplite {
      let playable = new PlayableSplite(rect)
      playable.on(Dennin.enums.SpliteEvent.OnKeyDown.code, (e: CustomEvent) => {
        if (playable.keyConfig === null || playable.keyConfig === undefined) {
          return
        }
        const keyCode = e.detail
        if (keyCode === playable.keyConfig.goLeft) {
          playable.goLeft()
          playable.dispatch(Dennin.enums.SpliteEvent.OnGoLeft.code)
        } else if (keyCode === playable.keyConfig.goRight) {
          playable.goRight()
          playable.dispatch(Dennin.enums.SpliteEvent.OnGoRight.code)
        } else if (keyCode === playable.keyConfig.doJump) {
          playable.doJump()
          playable.dispatch(Dennin.enums.SpliteEvent.OnDoJump.code)
        } else if (keyCode === playable.keyConfig.doFall) {
          playable.doFall()
          playable.dispatch(Dennin.enums.SpliteEvent.OnDoFall.code)
        } else if (keyCode === playable.keyConfig.doAttack) {
          playable.doAttack()
          playable.dispatch(Dennin.enums.SpliteEvent.OnDoAttack.code)
        }
      })
      playable.on(Dennin.enums.SpliteEvent.OnKeyUp.code, (e: CustomEvent) => {
        if (playable.keyConfig === null || playable.keyConfig === undefined) {
          return
        }
        const keyCode = e.detail
        if (keyCode === playable.keyConfig.goLeft) {
          playable.stopLeft()
          playable.dispatch(Dennin.enums.SpliteEvent.OnStopLeft.code)
        } else if (keyCode === playable.keyConfig.goRight) {
          playable.stopRight()
          playable.dispatch(Dennin.enums.SpliteEvent.OnStopRight.code)
        } else if (keyCode === playable.keyConfig.doJump) {
          playable.stopJump()
          playable.dispatch(Dennin.enums.SpliteEvent.OnStopJump.code)
        }
      })
      return playable
    }

    keyConfig: KeyConfig

    setDefaultKeyConfig(): Splite {
      return this.setKeyConfig(Dennin.config.defaultKeyConfig)
    }

    setKeyConfig(newKeyConfig: KeyConfig): Splite {
      this.keyConfig = newKeyConfig
      return this
    }
  }
}

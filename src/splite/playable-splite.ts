/// <reference path="./splite.ts" />

module Dennin {

  export class PlayableSplite extends Splite {

    static create(rect: Rect): PlayableSplite {
      let playable = new PlayableSplite(rect)
      playable.on(SpliteEvent[SpliteEvent.OnKeyDown], (e: CustomEvent) => {
        if (playable.keyConfig === null || playable.keyConfig === undefined) {
          return
        }
        const keyCode = e.detail
        if (keyCode === playable.keyConfig.goLeft) {
          playable.goLeft()
          playable.dispatch(SpliteEvent[SpliteEvent.OnGoLeft])
        } else if (keyCode === playable.keyConfig.goRight) {
          playable.goRight()
          playable.dispatch(SpliteEvent[SpliteEvent.OnGoRight])
        } else if (keyCode === playable.keyConfig.doJump) {
          playable.doJump()
          playable.dispatch(SpliteEvent[SpliteEvent.OnDoJump])
        } else if (keyCode === playable.keyConfig.doFall) {
          playable.doFall()
          playable.dispatch(SpliteEvent[SpliteEvent.OnDoFall])
        } else if (keyCode === playable.keyConfig.doAttack) {
          playable.doAttack()
          playable.dispatch(SpliteEvent[SpliteEvent.OnDoAttack])
        }
      })
      playable.on(SpliteEvent[SpliteEvent.OnKeyUp], (e: CustomEvent) => {
        if (playable.keyConfig === null || playable.keyConfig === undefined) {
          return
        }
        const keyCode = e.detail
        if (keyCode === playable.keyConfig.goLeft) {
          playable.stopLeft()
          playable.dispatch(SpliteEvent[SpliteEvent.OnStopLeft])
        } else if (keyCode === playable.keyConfig.goRight) {
          playable.stopRight()
          playable.dispatch(SpliteEvent[SpliteEvent.OnStopRight])
        } else if (keyCode === playable.keyConfig.doJump) {
          playable.stopJump()
          playable.dispatch(SpliteEvent[SpliteEvent.OnStopJump])
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

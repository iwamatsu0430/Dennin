module Dennin {

  export class Splite {

    static create(position: Position, size: Size): Splite {
      let element = document.createElement('splite')
      let splite = new Splite(element)
      splite.position = position
      splite.size = size

      return splite
    }

    element: Element
    position: Position
    size: Size

    constructor(element: Element) {
      this.element = element
    }

    goLeft(): void {}
    goRight(): void {}
    doJump(): void {}
    doFall(): void {}
    doAttack(): void {}
    stopLeft(): void {}
    stopRight(): void {}
    stopJump(): void {}
  }

  export class PlayableSplite extends Splite {

    static create(position: Position, sie: Size): PlayableSplite {
      let playable = <PlayableSplite>Splite.create(position, sie)
      playable.element.addEventListener('keydown', (e: KeyboardEvent) => {
        if (playable.keyConfig === null || playable.keyConfig === undefined) {
          return
        }
        if (e.charCode === playable.keyConfig.goLeft) {
          playable.goLeft()
        } else if (e.charCode === playable.keyConfig.goRight) {
          playable.goRight()
        } else if (e.charCode === playable.keyConfig.doJump) {
          playable.doJump()
        } else if (e.charCode === playable.keyConfig.doFall) {
          playable.doFall()
        } else if (e.charCode === playable.keyConfig.doAttack) {
          playable.doAttack()
        }
      })
      playable.element.addEventListener('keyup', (e: KeyboardEvent) => {
        if (playable.keyConfig === null || playable.keyConfig === undefined) {
          return
        }
        if (e.charCode === playable.keyConfig.goLeft) {
          playable.stopLeft()
        } else if (e.charCode === playable.keyConfig.goRight) {
          playable.stopRight()
        } else if (e.charCode === playable.keyConfig.doJump) {
          playable.stopJump()
        }
      })
      return playable
    }

    keyConfig: KeyConfig

    setDefaultKeyConfig(): Splite {
      return this.setKeyConfig({
        goLeft: 37,
        goRight: 39,
        doJump: 38,
        doFall: 40,
        doAttack: 65
      })
    }

    setKeyConfig(newKeyConfig: KeyConfig): Splite {
      this.keyConfig = newKeyConfig
      return this
    }
  }
}

module Dennin {

  export class Config {

    nodeName: string = 'DENNIN-SPLITE'

    defaultKeyConfig: KeyConfig = {
      goLeft: 37,
      goRight: 39,
      doJump: 38,
      doFall: 40,
      doAttack: 65
    }

    fps: number = 60
  }
}

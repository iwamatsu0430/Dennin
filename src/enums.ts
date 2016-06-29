module Dennin {

  class EnumDef {

    code: string

    constructor(code: string) {
      this.code = code
    }
  }

  class EnumBase<T extends EnumDef> {

    values: T[]

    valueOf = (code: string) => {
      const filtered = this.values.filter((value: T) => value.code === code)
      return filtered.length > 0 ? filtered[0] : null
    }
  }

  export class Enums {
    SpliteEvent: SpliteEvent = new SpliteEvent()
  }

  class SpliteEventDef extends EnumDef {}
  class SpliteEvent extends EnumBase<SpliteEventDef> {
    OnKeyDown = new SpliteEventDef('OnKeyDown')
    OnKeyUp = new SpliteEventDef('OnKeyUp')
    OnGoLeft = new SpliteEventDef('OnGoLeft')
    OnGoRight = new SpliteEventDef('OnGoRight')
    OnDoJump = new SpliteEventDef('OnDoJump')
    OnDoFall = new SpliteEventDef('OnDoFall')
    OnDoAttack = new SpliteEventDef('OnDoAttack')
    OnStopLeft = new SpliteEventDef('OnStopLeft')
    OnStopRight = new SpliteEventDef('OnStopRight')
    OnStopJump = new SpliteEventDef('OnStopJump')
    OnCollisionWindow = new SpliteEventDef('OnCollisionWindow')
    OnCollisionElements = new SpliteEventDef('OnCollisionElements')
    
    values = [this.OnKeyDown, this.OnKeyUp, this.OnGoLeft, this.OnGoRight, this.OnDoJump, this.OnDoFall, this.OnDoAttack, this.OnStopLeft, this.OnStopRight, this.OnStopJump, this.OnCollisionWindow, this.OnCollisionElements]
  }
}

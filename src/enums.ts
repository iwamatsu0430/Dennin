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
    Foo: Foo = new Foo()
  }

  class FooDef extends EnumDef {}
  class Foo extends EnumBase<FooDef> {
    A = new FooDef('A')
    B = new FooDef('B')
  }

  export enum SpliteEvent {
    OnKeyDown,
    OnKeyUp,
    OnGoLeft,
    OnGoRight,
    OnDoJump,
    OnDoFall,
    OnDoAttack,
    OnStopLeft,
    OnStopRight,
    OnStopJump,
    OnCollisionWindow,
    OnCollisionElements
  }
}

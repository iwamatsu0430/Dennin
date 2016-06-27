module Dennin {

  export class SpliteHelper {

    collision(splite: Splite): Splite {
      return this.collisionElements(this.collisionWindow(splite))
    }

    collisionWindow(splite: Splite): Splite {
      let rect = splite.rect
      let isCllision = false
      if (rect.position.x < 0) {
        rect.position.x = 0
        isCllision = true
      }
      if (rect.position.x + rect.size.width > window.innerWidth) {
        rect.position.x = window.innerWidth - rect.size.width
        isCllision = true
      }
      splite.rect = rect
      if (isCllision) {
        splite.dispatch(SpliteEvent[SpliteEvent.OnCollisionWindow])
      }
      return splite
    }

    collisionElements(splite: Splite): Splite {
      return null
    }
  }
}

module Dennin {

  export class SpliteHelper {

    collision(splite: Splite): void {
      this.collisionWindow(splite)
      this.collisionElements(splite)
    }

    collisionWindow(splite: Splite): void {
      let rect = splite.rect
      let isCollided = false
      if (rect.position.x < 0) {
        rect.position.x = 0
        isCollided = true
      }
      if (rect.position.x + rect.size.width > window.innerWidth) {
        rect.position.x = window.innerWidth - rect.size.width
        isCollided = true
      }
      splite.rect = rect
      if (isCollided) {
        splite.dispatch(Dennin.enums.SpliteEvent.OnCollisionWindow.code)
      }
    }

    collisionElements(splite: Splite): void {
      return null
    }
  }
}

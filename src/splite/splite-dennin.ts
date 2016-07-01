/// <reference path="./splite-playable.ts"/>

module Dennin {

  export class SpliteDennin extends SplitePlayable {

    static create(rect: Rect): SpliteDennin {
      return new SpliteDennin(rect)
    }

    // false <= => true
    direction: boolean = false

    jumpCount: number = 0

    loop(): void {
      this.collision()
      this.rect.position.x += this.accel.x
      this.rect.position.y += this.accel.y
      this.moveY()
      this.moveX()
    }

    moveY(): void {
      // if(this.isFloating || this.isJumping) {
      //   this.accel.y = (this.accel.y < 10) ? this.accel.y + 1 : 10
      // }
    }

    moveX(): void {
      if (!this.status.isMovingX && this.accel.x * this.accel.x >= 1) {
        const counter = this.direction ? -1 : 1
        this.accel.x += counter
        if (this.accel.x * this.accel.x <= 1) {
          this.accel.x = 0
        }
      }
    }

    goLeft(): void {
      if (this.accel.x > 0 && this.direction) {
        this.accel.x *= -0.8
      }
      this.accel.x += -1 * ((this.accel.x === 0) ? 2 : 0.5)
      if (this.accel.x < -15) {
        this.accel.x = -15
      }
      this.direction = false
      this.status.isMovingX = true
    }

    goRight(): void {
      if (this.accel.x < 0 && !this.direction) {
        this.accel.x *= -0.8
      }
      this.accel.x += (this.accel.x === 0) ? 2 : 0.5
      if (this.accel.x > 15) {
        this.accel.x = 15
      }
      this.direction = true
      this.status.isMovingX = true
    }

    doJump(): void {
      // if (this.jumpCount >= 3) {
      //   return
      // }
      // this.accel.y = -1 * 20
      // this.jumpCount++
    }

    doFall(): void {}
    doAttack(): void {}

    stopLeft(): void {
      this.status.isMovingX = false
    }

    stopRight(): void {
      this.status.isMovingX = false
    }

    stopJump(): void {}
    landing(): void {}
    floating(): void {}
    onOver(): void {}
    onMouseMove(): void {}
  }
}

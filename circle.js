class Circle {
  constructor (x, y, r, c, ctx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.ctx = ctx;
    this.isAlive = true;
  }

  draw () {
    this.ctx.strokeStyle = this.c;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, TWO_PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  update () {
    this.r += OFFSET_GOOD.r;
    if (this.r > MAX) {
      this.isAlive = false;
    }
  }
}

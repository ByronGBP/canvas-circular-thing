class Obstacle {
  constructor (x, y, r, ctx, fill) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;
    this.isAlive = true;
    this.fill = fill || false;
  }

  draw () {
    if (this.fill) {
      this.ctx.fillStyle = 'rgba(255,0,0,0.7)';
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, TWO_PI);
      this.ctx.fill();
      this.ctx.closePath();
    } else {
      this.ctx.strokeStyle = 'rgba(255,0,0,0.7)';
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.r, 0, TWO_PI);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  update () {
    this.x -= OFFSET_X;
    if (this.x < 0) {
      this.isAlive = false;
    }
  }

  setfill () {
    this.fill = true;
  }
}

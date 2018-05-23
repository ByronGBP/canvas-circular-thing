class Canvas {
  constructor () {
    this._setupSize();
    this._setupCanvas();
    this._setupStatus();
  }

  update () {
    this._updateCircles();
    if (!this.gameIsOver) {
      this._updateObstacles();
    }
  }

  draw () {
    this._drawBackground();
    this._drawCircles();
    if (!this.gameIsOver) {
      this._drawCircle();
      this._drawObstacles();
    }
  }

  clear () {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height);
  }

  createAnimation () {
    this.alpha = 1;
    this.counterAnimation = 0;
  }

  setAutomaticAnimation () {
    this.automaticAnimation = true;
  }

  checkCollision () {
    const _checkX = (x) => {
      return x < this.size.halfWidth + RADIUS * 2 && x > this.size.halfWidth - RADIUS * 2;
    };

    this.obstacles.forEach((obstacle) => {
      if (_checkX(obstacle.x)) {
        obstacle.setfill();
        this.points += 1;
      }
    });
  }

  onGameOver (fn) {
    this.gameOver = fn;
  }

  _setupStatus () {
    this.circles = [];
    this.obstacles = [];
    this.circle = new Obstacle(this.size.halfWidth, this.size.halfHeight, RADIUS / 2, this.ctx, true);
    this.counterAnimation = 0;
    this.counterObstacles = 0;
    this.alpha = 0;
    this.points = 0;
    this.waitingObstacles = false;
    this.automaticAnimation = false;
  }

  _setupSize () {
    const height = window.innerHeight;
    const halfHeight = window.innerHeight / 2;
    const width = window.innerWidth;
    const halfWidth = window.innerWidth / 2;
    this.size = {
      height,
      width,
      halfHeight,
      halfWidth
    };
  }

  _setupCanvas () {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.zIndex = '-1';
    this.ctx = this.canvas.getContext('2d');
    this.ctx.canvas.height = this.size.height;
    this.ctx.canvas.width = this.size.width;
    document.body.appendChild(this.canvas);
  }

  _updateObstacles () {
    this.obstacles.forEach((obstacle, idx) => {
      obstacle.update();
      if (!obstacle.isAlive) {
        this._removeObstacle(idx);
      }
    });
    this._updateCounterObstacle();
  }

  _updateCircles () {
    this.circles.forEach((circle, idx) => {
      circle.update();
      if (!circle.isAlive) {
        this._removeCircle(idx);
      }
    });
    this._updateCounterAnimation();
  }

  _updateCounterAnimation () {
    this.counterAnimation += 1;
    if (this.counterAnimation > OFFSET_GOOD.c) {
      this.counterAnimation = 0;
      this._updateAlpha();
      if (this.alpha > 0) {
        this._createCircle();
      }
    }
  }

  _updateCounterObstacle () {
    if (this.points === 3 && this.obstacles.length === 0) {
      this.gameIsOver = true;
      this.gameOver();
      return;
    }
    this.counterObstacles += 1;
    if (this.counterObstacles > OFFSET_O) {
      this.counterObstacles = 0;
      this._createObstacle();
    }
  }

  _updateAlpha () {
    if (this.alpha > 0) {
      this.alpha -= 0.1;
    }
    if (this.automaticAnimation && this.alpha < 0) {
      this.alpha = 1;
    }
  }

  _drawBackground () {
    this.ctx.fillStyle = 'rgba(0,0,0,1)';
    this.ctx.fillRect(0, 0, this.size.width, this.size.height);
  }

  _drawCircles () {
    this.circles.forEach((circle) => {
      circle.draw();
    });
  }

  _drawObstacles () {
    this.obstacles.forEach((obstacle) => {
      obstacle.draw();
    });
  }

  _drawCircle () {
    this.circle.draw();
  }

  _createCircle () {
    this.color = `rgba(255, 0 ,0, ${this.alpha})`;
    this.circles.push(new Circle(this.size.halfWidth, this.size.halfHeight, RADIUS, this.color, this.ctx));
  }

  _createObstacle () {
    if (this.obstacles.length === 3 || (this.waitingObstacles && this.obstacles.length !== 0)) {
      this.waitingObstacles = true;
    } else {
      this.obstacles.push(new Obstacle(this.size.width, this.size.halfHeight, RADIUS, this.ctx));
      this.waitingObstacles = false;
      this.points = 0;
    }
  }

  _removeCircle (idx) {
    this._remove(this.circles, idx);
  }

  _removeObstacle (idx) {
    this._remove(this.obstacles, idx);
  }

  _remove (arr, idx) {
    arr.splice(idx, 1);
  }
}

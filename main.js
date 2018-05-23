function main () {
  deleteBody();
  let isPressed = false;
  const canvas = new Canvas();
  let text = createText('Press space', true);
  canvas.onGameOver(() => {
    canvas.setAutomaticAnimation();
    setTimeout(() => {
      text = createText(TEXT_WIN, false);
    }, 500);
  });

  const _doAnimation = (e) => {
    if (e.keyCode === 32) {
      canvas.createAnimation();
      canvas.checkCollision();
      if (!isPressed) {
        isPressed = true;
        text.element.remove();
        clearInterval(text.intervalId);
      }
    }
  };

  const _animationCanvas = () => {
    canvas.clear();
    canvas.update();
    canvas.draw();
    requestAnimationFrame(_animationCanvas);
  };

  document.addEventListener('keyup', _doAnimation);
  requestAnimationFrame(_animationCanvas);
}

function createText (text, reverse) {
  let alpha = 0;
  let intervalId = null;
  let offset = reverse ? 0.01 : 0.001;
  let remove = false;
  const time = 10;
  const element = document.createElement('h1');
  const parent = document.body;
  element.innerText = text;
  element.style.fontSize = '1em';
  element.style.fontFamily = 'verdana';
  element.style.color = 'rgba(255,255,255,0)';
  parent.appendChild(element);

  function changeText () {
    if (reverse) {
      if ((alpha > 1 && offset > 0) || (alpha < 0 && offset < 0)) {
        offset = -offset;
      }
      alpha += offset;
    } else {
      if (alpha < 0.5) {
        alpha += offset;
      }
    }
    element.style.color = `rgba(255,255,255,${alpha})`;
  }
  intervalId = setInterval(changeText, time);
  return {element, intervalId};
}

function deleteBody () {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  document.body.style.margin = '0px';
  document.body.style.overflow = 'hidden';
  document.body.style.display = 'flex';
  document.body.style.height = '100vh';
  document.body.style.width = '100vw';
  document.body.style.justifyContent = 'center';
  document.body.style.alignItems = 'center';
}

main();

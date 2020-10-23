const cursor = document.getElementById("cursor");
let lastMove = 0, scale = 0.5;
let x = 0, y = 0, random = 0;
function enlargeMouse() {
  cursor.classList.add("cursor-big");
  scale = 1
}

function defaultMouse() {
  cursor.classList.remove("cursor-big");
  scale = 0.5
}

function onMouseMove(e) {
  x = e.clientX - 16;
  y = e.clientY - 16;
  updateMouse(x,y)
  lastMove = Date.now();
}

function render(a) {
  if (Date.now() - lastMove > 500) {
    // Update the random value
    random += 0.1;
    // Compute a x random offset based on the window width
    // const randX = noise.simplex3(1, 0, random) * window.innerWidth * 0.1;
    // // Compute a y random offset based on the window height
    // const randY = noise.simplex3(3, 0, random) * window.innerHeight * 0.1;

    // // Define the x & y values based on (noise * screen) + randomness
    // const x = noiseX * innerWidth + randX;
    // const y = noiseY * innerHeight + randY;

    const noiseX = (noise.simplex3(2, 0, a*0.0004) + 1) / 2;
    const noiseY = (noise.simplex3(10, 0, a*0.0004) + 1) / 2;
    const x = noiseX * innerWidth;
    const y = noiseY * innerHeight;
    updateMouse(x, y);
  }
}
function updateMouse(x, y) {
  cursor.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

window.addEventListener("mousemove", onMouseMove);

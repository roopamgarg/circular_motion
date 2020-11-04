
const elements = document.getElementsByClassName("box");
const len = elements.length;
let autoRotate = true;

if('serviceWorker' in navigator){
  navigator.serviceWorker
  .register("./sw.js")
  .then(function () {
    console.log('Service worker registered!');
  })
  .catch(function(err) {
    console.log(err);
  });
}


const rotateOneCard = (e) => {
   if(e){
    if(interval){
      clearInterval(interval);
    }
   }
  for (let i = 0; i < len; i++) {
    if (elements[i].classList.contains(`box--0`)) {
      if (e && e.deltaY && e.deltaY > 0) {
        for (let j = 0; j < len; j++) {
          elements[(i + j) % len].classList.remove(`box--${(j) % len}`);
          elements[(i + j) % len].classList.add(`box--${(j + 1) % len}`);
        }
      } else {
        for (let j = 0; j < len; j++) {
          elements[(i + j) % len].classList.remove(`box--${(j) % len}`);
          elements[(i + j) % len].classList.add(
            `box--${(j - 1 < 0 ? len - 1 : j - 1)}`
          );
        }
      }
      break;
    }
  }
}
const interval = setInterval(rotateOneCard,2000);

const getCustomCard = (i) => {
  if(interval){
    clearInterval(interval);
  }
  for (let k = 0; k < len; k++) {
    if(elements[i].classList.contains(`box--${k}`)){
        const diff = ((9 - i) < 0) ? i + len : 9 - k;
        for (let j = 0; j < len; j++) {
          elements[(i + j) % len].classList.remove(`box--${(k+j) % len}`);
          elements[(i + j) % len].classList.add(`box--${( diff + k + j) % len}`);
        }
        break;
      }
    }
    
}
for (let i = 0; i < len; i++) {
  elements[i].addEventListener('mousemove',enlargeMouse)
  elements[i].addEventListener('mouseleave',defaultMouse)
  elements[i].addEventListener('click', () => debounce(getCustomCard(i),100))
}

window.addEventListener(
  "mousewheel",
  debounce(rotateOneCard, 30)
);

window.addEventListener(
  "touchmove",
  debounce(rotateOneCard, 30)
);



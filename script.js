var swiper = new Swiper(".projectsSwiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  mousewheel: {
    releaseOnEdges: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var wobbleElements = document.querySelectorAll(".wobble");

wobbleElements.forEach(function (el) {
  el.addEventListener("mouseover", function () {
    if (
      !el.classList.contains("animating") &&
      !el.classList.contains("mouseover")
    ) {
      el.classList.add("animating", "mouseover");

      var letters = el.innerText.split("");

      setTimeout(function () {
        el.classList.remove("animating");
      }, (letters.length + 1) * 50);

      var animationName = el.dataset.animation;
      if (!animationName) {
        animationName = "jump";
      }

      el.innerText = "";

      letters.forEach(function (letter) {
        if (letter == " ") {
          letter = "&nbsp;";
        }
        el.innerHTML += '<span class="letter">' + letter + "</span>";
      });

      var letterElements = el.querySelectorAll(".letter");
      letterElements.forEach(function (letter, i) {
        setTimeout(function () {
          letter.classList.add(animationName);
        }, 50 * i);
      });
    }
  });

  el.addEventListener("mouseout", function () {
    el.classList.remove("mouseover");
  });
});

// Cursor
function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}

const cursor = document.createElement("div");
cursor.className = "cursor";

const cursorF = document.createElement("div");
cursorF.className = "cursor-f";
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = 0.16;

document.body.appendChild(cursor);
document.body.appendChild(cursorF);

if ("ontouchstart" in window) {
  cursor.style.display = "none";
  cursorF.style.display = "none";
}

cursor.style.setProperty("--size", size + "px");
cursorF.style.setProperty("--size", sizeF + "px");

window.addEventListener("mousemove", function (e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX - size / 2 + "px";
  cursor.style.top = e.clientY - size / 2 + "px";
});

function loop() {
  cursorX = lerp(cursorX, pageX, followSpeed);
  cursorY = lerp(cursorY, pageY, followSpeed);
  cursorF.style.top = cursorY - sizeF / 2 + "px";
  cursorF.style.left = cursorX - sizeF / 2 + "px";
  requestAnimationFrame(loop);
}

loop();

let startY;
let endY;
let clicked = false;

function mousedown(e) {
  gsap.to(cursor, { scale: 4.5 });
  gsap.to(cursorF, { scale: 0.4 });

  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}

function mouseup(e) {
  gsap.to(cursor, { scale: 1 });
  gsap.to(cursorF, { scale: 1 });

  endY = e.clientY || endY;
  // if (clicked && startY && Math.abs(startY - endY) >= 40) {
  //   go(!Math.min(0, startY - endY) ? 1 : -1);
  //   clicked = false;
  //   startY = null;
  //   endY = null;
  // }
}

window.addEventListener("mousedown", mousedown, false);
window.addEventListener("touchstart", mousedown, false);
window.addEventListener(
  "touchmove",
  function (e) {
    if (clicked) {
      endY = e.touches[0].clientY || e.targetTouches[0].clientY;
    }
  },
  false
);
window.addEventListener("touchend", mouseup, false);
window.addEventListener("mouseup", mouseup, false);

let scrollTimeout;
function wheel(e) {
  clearTimeout(scrollTimeout);
  // setTimeout(function () {
  //   if (e.deltaY < -40) {
  //     go(-1);
  //   } else if (e.deltaY >= 40) {
  //     go(1);
  //   }
  // });
}
window.addEventListener("mousewheel", wheel, false);
window.addEventListener("wheel", wheel, false);

// Add hover effect for links
document.querySelectorAll("a, .hover-target, .cards__card").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hover");
    cursorF.style.display = "none";
  });

  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hover");
    cursorF.style.display = "block";
  });
});



// Получаем все секции
const sections = document.querySelectorAll('.section');

// Настраиваем анимацию для каждой секции
sections.forEach(section => {
  // Скрываем секцию в начале
  gsap.set(section, { opacity: 0, y: 100 });

  // Создаем твин для анимации появления при прокрутке
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%', // Анимация начнется, когда верх секции будет на 80% от верхней границы окна
    onEnter: () => gsap.to(section, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }),
    onEnterBack: () => gsap.to(section, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }),
    onLeave: () => gsap.to(section, { opacity: 0, y: 100, duration: 0.5, ease: 'power2.in' }),
    onLeaveBack: () => gsap.to(section, { opacity: 0, y: 100, duration: 0.5, ease: 'power2.in' })
  });
});


const tl = gsap.timeline();

tl.from(".line .span", 1.8, {
  y: 100,
  ease: "power4.out",
  delay: 1,
  skewY: 7,
  stagger: {
    amount: 0.3
  }
})
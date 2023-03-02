let nave = document.querySelector(".nave");
let body = document.querySelector("body");
let laser = document.getElementById("laser");
let explosion = document.getElementById("explosion");
let live = document.querySelector("i");
let times = document.getElementById("times");
let lives = 5;
let second = 60;

//set timer
setInterval(() => {
  second--;
  times.textContent = second;
  if (second == 0) {
    alert("Ganaste..!!!");
    location.reload();
  }
}, 1000);

//genera movimiento de la nave con el mouse
document.addEventListener("mousemove", (e) => {
  nave.style.left = e.clientX - 40 + "px";
});

//generar disparo
document.addEventListener("click", () => {
  let bala = document.createElement("div");
  bala.classList.add("bala");
  bala.style.bottom = 70 + "px";
  bala.style.left = nave.getBoundingClientRect().left + 40 + "px";
  body.append(bala);
  laser.play();
});
//movimiento bala
setInterval(() => {
  let balas = document.querySelectorAll(".bala");
  balas.forEach((bala) => {
    bala.style.top = bala.getBoundingClientRect().top - 20 + "px";

    if (bala.getBoundingClientRect().top <= 0) {
      bala.remove();
    }
    //detectar colision bala roca
    let enemigos = document.querySelectorAll(".enemigo");

    enemigos.forEach((enemigo) => {
      if (
        bala.getBoundingClientRect().top <=
        enemigo.getBoundingClientRect().top + 50
      ) {
        if (
          bala.getBoundingClientRect().left >=
            enemigo.getBoundingClientRect().left &&
          bala.getBoundingClientRect().left <=
            enemigo.getBoundingClientRect().left + 80
        ) {
          enemigo.style.backgroundImage = 'url("../img/explosion.png")';
          explosion.play();
          setTimeout(() => {
            enemigo.remove();
            explosion.stop();
          }, 100);
        }
      }
    });
  });
}, 100);

//enemigos meteoritos
let aparecer = 0;
setInterval(() => {
  aparecer++;
  if (aparecer % 10 == 0) {
    let enemigo = document.createElement("div");
    enemigo.classList.add("enemigo");
    body.append(enemigo);
    enemigo.style.left = Math.random() * window.innerWidth - 100 + "px";
  }
  let enemigos = document.querySelectorAll(".enemigo");
  enemigos.forEach((element) => {
    element.style.top = element.getBoundingClientRect().top + 10 + "px";
    if (
      element.getBoundingClientRect().top > nave.getBoundingClientRect().top
    ) {
      lives--; //descuenta 1 vida
      live.textContent = lives;
      if (lives == -1) {
        alert("Game Over");
        location.reload();
      }
      element.remove(); //eliminar rocas a la altura de la base de la nave
    }
  });
}, 100);

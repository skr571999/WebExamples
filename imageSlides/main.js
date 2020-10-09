let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let slide = document.querySelector(".slideContainer img");

let count = 1;
next.addEventListener("click", () => {
  count++;
  if (count === 4) {
    count = 1;
  }
  let image = "./images/img" + count + ".jpg";
  slide.setAttribute("src", image);
});

prev.addEventListener("click", () => {
  count--;
  if (count < 1) {
    count = 3;
  }
  let image = "./images/img" + count + ".jpg";
  slide.setAttribute("src", image);
});

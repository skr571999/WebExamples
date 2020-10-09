const slides = document.querySelector(".slides");
const slidesImages = document.querySelectorAll(".slides img");

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

let counter = 1;
const size = slidesImages[0].clientWidth;

slides.style.transform = "translateX(" + -size * counter + "px)";

nextBtn.addEventListener("click", () => {
  if (counter >= slidesImages.length - 1) return;
  slides.style.transition = "transform 0.4s ease-in-out";
  counter++;

  slides.style.transform = "translateX(" + -size * counter + "px)";
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  slides.style.transition = "transform 0.4s ease-in-out";
  counter--;

  slides.style.transform = "translateX(" + -size * counter + "px)";
});

slides.addEventListener("transitionend", () => {
  if (slidesImages[counter].id === "lastClone") {
    slides.style.transition = "none";
    counter = slidesImages.length - 2;
    slides.style.transform = "translateX(" + -size * counter + "px)";
  }

  if (slidesImages[counter].id === "firstClone") {
    slides.style.transition = "none";
    counter = slidesImages.length - counter;
    slides.style.transform = "translateX(" + -size * counter + "px)";
  }
});

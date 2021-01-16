const slides = document.querySelector(".slides");
const slidesImages = document.querySelectorAll(".slides img");

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

let counter = 1;
let size = slidesImages[0].clientWidth;

const handleResize = () => {
  console.log("Resizing");
  size = slidesImages[0].clientWidth;
  slides.style.transform = "translateX(" + -size * counter + "px)";
};

const handleNextClick = () => {
  if (counter >= slidesImages.length - 1) return;
  slides.style.transition = "transform 0.4s ease-in-out";
  counter++;

  slides.style.transform = "translateX(" + -size * counter + "px)";
};

const handlePreviousClick = () => {
  if (counter <= 0) return;
  slides.style.transition = "transform 0.4s ease-in-out";
  counter--;

  slides.style.transform = "translateX(" + -size * counter + "px)";
};

const handleTransitionEnd = () => {
  if (slidesImages[counter].id === "lastClone") {
    slides.style.transition = "none";
    counter = slidesImages.length - 2;
    slides.style.transform = `translateX(${-size * counter}px)`;
  }

  if (slidesImages[counter].id === "firstClone") {
    slides.style.transition = "none";
    counter = slidesImages.length - counter;
    slides.style.transform = `translateX(${-size * counter}px)`;
  }
};

handleResize();
window.addEventListener("resize", handleResize);
nextBtn.addEventListener("click", handleNextClick);
prevBtn.addEventListener("click", handlePreviousClick);
slides.addEventListener("transitionend", handleTransitionEnd);

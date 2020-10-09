let photo1 = document.querySelector("#photo1");
let imagesContainer = document.querySelector(".imagesContainer");

photo1.addEventListener("input", e => {
  for (let i of e.target.files) {
    console.log(i);
    let fr = new FileReader();
    fr.onload = e => {
      let img = document.createElement("img");
      img.src = e.target.result;
      img.width = 100;
      imagesContainer.appendChild(img);
    };

    fr.readAsDataURL(i);
  }
  a = e;
});

function applyScrollspy() {
  let section = document.querySelectorAll(".scrollspy-content > .section");
  let sections = {};
  let i = 0;

  Array.prototype.forEach.call(section, e => {
    sections[e.id] = e.offsetTop;
  });

  window.onscroll = () => {
    let scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        document.querySelector(".active").setAttribute("class", " ");
        document
          .querySelector("a[href*=" + i + "]")
          .setAttribute("class", "active");
      }
    }
  };
}

applyScrollspy();

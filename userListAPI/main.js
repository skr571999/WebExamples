let container = document.querySelector(".userContainer");
let dataUrl = "https://randomuser.me/api/?results=6";

// TODO: Add the refresh Button

function getData(url) {
  fetch(url)
    .then(res => res.json())
    .then(result => {
      //   console.log(result);
      showUsers(result.results);
    })
    .catch(err => {
      console.error("Error : ", err);
    });
}

function showUsers(users) {
  for (let user of users) {
    let userData = {};
    userData.name = `${user.name.title} ${user.name.first} ${user.name.last}`;
    userData.imgUrl = user.picture.large;
    userData.email = user.email;
    container.append(createUser(userData));
  }
}

function createUser(user) {
  let div1 = document.createElement("div");
  let img1 = document.createElement("img");
  let div2 = document.createElement("div");
  let h21 = document.createElement("h2");
  let p1 = document.createElement("p");

  div2.append(h21);
  div2.append(p1);
  div2.classList.add("userDetail");
  h21.innerHTML = user.name;
  img1.setAttribute("src", user.imgUrl);
  p1.innerHTML = user.email;

  div1.append(img1);
  div1.append(div2);
  return div1;
}

getData(dataUrl);

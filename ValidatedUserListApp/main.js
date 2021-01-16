const Users = [];
const tbody = document.querySelector("table > tbody");
const registerForm = document.forms[0];
let name = document.forms[0]["name"];
let email = document.forms[0]["email"];
let password = document.forms[0]["password"];
let password2 = document.forms[0]["password2"];

// TODO: make form reset function
// TODO: handle the space input

registerForm.addEventListener("submit", e => {
  e.preventDefault();

  if (
    registerForm.checkValidity() &&
    checkName(name) &&
    checkEmail(email) &&
    checkPassword(password) &&
    checkPassword2(password2)
  ) {
    addUser(name.value, email.value, password.value);
    name.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";
  } else {
    alert("Input Not Valid");
  }
});

function addUser(name, email, password) {
  let tr1 = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");

  td1.innerHTML = name;
  td2.innerHTML = email;
  td3.innerHTML = password;

  tr1.appendChild(td1);
  tr1.appendChild(td2);
  tr1.appendChild(td3);

  tbody.appendChild(tr1);
}

function checkName(nameElem) {
  if (nameElem.checkValidity()) {
    // min length 3 validation
    if (nameElem.value.length > 3) {
      nameElem.style.border = "2px solid green";
      nameElem.parentElement.children[1].innerHTML = "";
      return true;
    }
  }
  nameElem.style.border = "2px solid red";
  nameElem.parentElement.children[1].innerHTML =
    "Length Must be greater than 3";

  return false;
}

function checkEmail(emailElem) {
  if (emailElem.checkValidity()) {
    emailElem.style.border = "2px solid green";
    return true;
  }
  emailElem.style.border = "2px solid red";
  return false;
}

function checkPassword(passwordElem) {
  if (passwordElem.checkValidity()) {
    if (passwordElem.value.length > 4) {
      passwordElem.parentElement.children[1].innerHTML = "";
      passwordElem.style.border = "2px solid green";
      return true;
    }
  }
  passwordElem.style.border = "2px solid red";
  passwordElem.parentElement.children[1].innerHTML =
    "Length Must be greater than 4";
  return false;
}

function checkPassword2(password2Elem) {
  if (password2Elem.checkValidity()) {
    if (password.value === password2Elem.value) {
      password2Elem.style.border = "2px solid green";
      password2Elem.parentElement.children[1].innerHTML = "";
      return true;
    }
  }
  password2Elem.style.border = "2px solid red";
  password2Elem.parentElement.children[1].innerHTML = "Password Not Matched";
  return false;
}

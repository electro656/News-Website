"use strict";

let firstNameInput = document.getElementById("input-firstname");
let lastNameInput = document.getElementById("input-lastname");
let usernameInput = document.getElementById("input-username");
let passInput = document.getElementById("input-password");
let rePassInput = document.getElementById("input-password-confirm");
let registerBtn = document.getElementById("btn-submit");

// let userArr = getFromStorage("userArr");
console.log(`userArr:`, userArr);

class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}

function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );

  return user;
}

registerBtn.addEventListener("click", function () {
  const data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: usernameInput.value,
    password: passInput.value,
  };

  // Validate entered data
  if (firstNameInput.value === "") alert(`Please enter first name`);
  if (lastNameInput.value === "") alert(`Please enter last name`);
  if (usernameInput.value === "") alert(`Please enter username`);
  for (let i in userArr) {
    if (usernameInput.value === userArr[i].username)
      alert(`Username must be unique for each user`);
  }
  if (passInput.value === "") alert(`Please enter password`);
  if (passInput.value.length <= 8)
    alert(`Password needs to have more than 8 characters`);
  if (rePassInput.value === "")
    alert(`Please re-enter password for confirmation`);
  if (rePassInput.value !== passInput.value)
    alert("Re-entered password is not the same as the above password field");

  const validateData = function (arr) {
    if (
      arr.firstName !== "" &&
      arr.lastName !== "" &&
      arr.username !== "" &&
      userArr.every((obj) => obj.username !== arr.username) &&
      arr.password !== "" &&
      arr.password.length > 8 &&
      rePassInput.value !== "" &&
      rePassInput.value === arr.password
    ) {
      return true;
    } else {
      return false;
    }
  };

  if (validateData(data)) {
    console.log("VALIDATION SUCCESSFUL!!!!!");
    userArr.push(data);

    // Save registration info into userArr + localStorage
    saveToStorage("userArr", userArr);
    console.log(parseUser(data));

    // Switch to login page
    window.location.href = "../pages/login.html";
  } else {
    console.log("VALIDATION UNSUCCESSFUL!");
  }
});

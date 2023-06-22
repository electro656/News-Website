"use strict";

const userLoginInput = document.getElementById("input-username");
const passLoginInput = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

loginBtn.addEventListener("click", function () {
  if (userLoginInput.value === "" || passLoginInput.value === "")
    alert("Please enter both username and password!");
  else {
    for (let i in userArr) {
      if (userLoginInput.value === userArr[i].username) {
        if (passLoginInput.value === userArr[i].password) {
          if (currentUser.length === 1) {
            currentUser[0] = userArr[i];
            saveToStorage("currentUser", currentUser);
            console.log("Successfully switched user!");
          } else if (currentUser.length === 0) {
            currentUser.push(userArr[i]);
            saveToStorage("currentUser", currentUser);
            console.log("Successfully logged in!");
          }
          // Move back to homepage
          window.location.href = "../index.html";
        }
        if (
          userLoginInput.value !== userArr[i].username ||
          passLoginInput.value !== userArr[i].password
        ) {
          alert("Wrong username and/or password!");
          break;
        }
      }
    }
  }
});

// console.log(currentUser.firstName);

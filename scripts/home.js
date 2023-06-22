"use strict";

// TASK 4: Home Page

currentUser = getFromStorage("currentUser");

const welcome = document.getElementById("welcome-message");
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const logOutBtn = document.getElementById("btn-logout");

if (currentUser.length === 1) {
  welcome.innerHTML = `Welcome ${currentUser[0].username}`;
  loginModal.classList.add("hide");
  mainContent.classList.remove("hide");
}

// TASK 5: Chức năng Logout

logOutBtn.addEventListener("click", function () {
  currentUser.pop();
  saveToStorage("currentUser", currentUser);
  loginModal.classList.remove("hide");
  mainContent.classList.add("hide");
});

"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultValue = "[]") {
  return JSON.parse(localStorage.getItem(key) ?? defaultValue);
}

let currentUser = getFromStorage("currentUser");
let userArr = getFromStorage("userArr");

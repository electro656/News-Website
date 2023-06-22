"use strict";

// TASK 9: Thay đổi thiết lập

const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const saveBtn = document.getElementById("btn-submit");
let settings = getFromStorage("settings");

pageSizeInput.value = settings.pageSizeSettings;
categoryInput.value = settings.categorySettings;

saveBtn.addEventListener("click", function () {
  const dataSettings = {
    pageSizeSettings: pageSizeInput.value,
    categorySettings: categoryInput.value,
  };
  if (pageSizeInput.value === "" || pageSizeInput.value === 0) {
    alert("Missing or invalid page size value!");
  } else {
    saveToStorage("settings", dataSettings);
    alert("Settings saved!");
  }
});

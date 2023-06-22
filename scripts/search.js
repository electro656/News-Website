"use strict";

//TASK 10: (Nâng cao) Tìm kiếm bài viết theo từ khóa

const newsContainer = document.getElementById("news-container");
const pageNumbers = document.getElementById("page-numbers");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const searchInput = document.getElementById("input-query");
const searchBtn = document.getElementById("btn-submit");
newsContainer.innerHTML = "";

let currentPage;
let numOfPages;
let numArr = [];

let settings = getFromStorage("settings");

// Add and display articles to HTML
const renderArticles = function (dataArr) {
  for (let i in dataArr) {
    const articleBlock = document.createElement("div");
    articleBlock.classList.add("card", "flex-row", "flex-wrap");
    articleBlock.innerHTML = `
  <div class="card mb-3" style="">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img
          src="${dataArr[i].urlToImage}"
          class="card-img"
          alt="image"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            ${dataArr[i].title}
          </h5>
          <p class="card-text">
            ${
              dataArr[i].description !== null
                ? dataArr[i].description
                : "No description"
            }
          </p>
          <a
            href="${dataArr[i].url}"
            class="btn btn-primary"
            >View</a
          >
        </div>
      </div>
    </div>
  </div>
`;
    newsContainer.append(articleBlock);
  }
};

// Display articles of the current page
const fetchNews = async function (curPage) {
  newsContainer.innerHTML = "";
  page = curPage;

  response = await fetch(
    `https://newsapi.org/v2/everything?q=${searchKeyWord}&pageSize=${pageSize}&page=${page}&apiKey=b0035e1c316f4c0cb3be06bb843d8656`
  );
  newsData = await response.json();
  articles = newsData.articles;
  renderArticles(articles);
};

// Add page numbers to HTML
const appendPageNumbers = function (index) {
  const pageNum = document.createElement("li");
  pageNum.classList.add("page-item", "page-links");
  pageNum.innerHTML = `<a class="page-link" href="#">${index}</a>`;

  pageNumbers.append(pageNum);
};

const getNews = async function (
  searchKeyWord,
  pageSize = settings.pageSizeSettings ?? 5,
  page = 1
) {
  let response = await fetch(
    `https://newsapi.org/v2/everything?q=${searchKeyWord}&pageSize=${pageSize}&page=${page}&apiKey=b0035e1c316f4c0cb3be06bb843d8656`
  );

  let newsData = await response.json();

  const maxOfNewsData =
    newsData.totalResults <= 100 ? newsData.totalResults : 100;
  numOfPages = Math.ceil(maxOfNewsData / pageSize);

  for (let i = 1; i <= numOfPages; i++) {
    appendPageNumbers(i);
    numArr.push(i);
  }

  const pages = document.querySelectorAll("a.page-link");
  const listOfPages = document.querySelectorAll("li.page-links");

  const setCurrentPage = function (pNum = 1) {
    currentPage = pNum;
    const pageInArr = numArr.findIndex((index) => index === currentPage);
    try {
      pages[pageInArr].classList.add("active");
      listOfPages[pageInArr].classList.add("disabled");
    } catch {
      console.log("no news right now, sorry!");
    }
  };

  setCurrentPage();
  if (currentPage === 1 && pages[0] !== undefined)
    prevBtn.classList.add("hide");

  const hideButton = function () {
    if (currentPage === 1) {
      prevBtn.classList.add("hide");
    } else {
      prevBtn.classList.remove("hide");
    }
    if (currentPage === numOfPages) {
      nextBtn.classList.add("hide");
    } else {
      nextBtn.classList.remove("hide");
    }
  };

  const fetchNews = async function (curPage) {
    newsContainer.innerHTML = "";
    page = curPage;

    response = await fetch(
      `https://newsapi.org/v2/everything?q=${searchKeyWord}&pageSize=${pageSize}&page=${page}&apiKey=b0035e1c316f4c0cb3be06bb843d8656`
    );
    newsData = await response.json();
    articles = newsData.articles;
    renderArticles(articles);
  };

  // Add event to previous btn
  prevBtn.addEventListener("click", async function () {
    pages.forEach((button) => button.classList.remove("active"));
    listOfPages.forEach((button) => button.classList.remove("disabled"));
    setCurrentPage(currentPage - 1);
    hideButton();
    // console.log(`currentPage is: ${currentPage}`);
    fetchNews(currentPage);
  });

  // Add event to next btn
  nextBtn.addEventListener("click", async function () {
    pages.forEach((button) => button.classList.remove("active"));
    listOfPages.forEach((button) => button.classList.remove("disabled"));
    setCurrentPage(currentPage + 1);
    hideButton();
    // console.log(`currentPage is: ${currentPage}`);
    fetchNews(currentPage);
  });

  // console.log(pages);
  pages.forEach((p) => {
    p.addEventListener("click", async function (e) {
      pages.forEach((button) => button.classList.remove("active"));
      listOfPages.forEach((button) => button.classList.remove("disabled"));
      if (p === e.target) {
        p.classList.add("active");
        e.target.parentElement.classList.add("disabled");
        currentPage = Number(e.target.textContent);
        console.log(`currentPage is: ${currentPage}`);

        fetchNews(Number(p.innerHTML));
      }
      if (e.target === pages[0]) {
        prevBtn.classList.add("hide");
      } else if (e.target !== pages[0]) {
        prevBtn.classList.remove("hide");
      }

      if (e.target === pages[pages.length - 1]) {
        nextBtn.classList.add("hide");
      } else if (e.target !== pages[pages.length - 1]) {
        nextBtn.classList.remove("hide");
      }
    });
  });

  let articles = newsData.articles;

  renderArticles(articles);
};

searchBtn.addEventListener("click", function () {
  if (searchInput.value !== "") {
    pageNumbers.innerHTML = "";
    newsContainer.innerHTML = "";
    document.getElementById("nav-page-num").classList.remove("hide");
    getNews(searchInput.value);
  } else if (searchInput.value === "") {
    alert("Please enter the search keyword!");
  }
});

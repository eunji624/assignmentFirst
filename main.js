const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWFiMzdhNmIxYTkzZDIzOTY1NGZiY2ZmM2VhOWRkMCIsInN1YiI6IjY1MmY2ZjU0MzU4ZGE3NWI1YzBkNzdhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0picm_azk3-QIu74ME7GpG1oTeQ5H4bGm7tRS-76--A",
  },
};

let datas = [];

let url = "https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1";
fetch(url, options)
  .then((response) => response.json())
  .then((response) => {
    datas = response.results;
    console.log(datas);
    appendFunc(datas);
  })
  .catch((err) => console.error(err));

function appendFunc(da) {
  document.querySelector(".cardContainer").innerHTML = "";
  da.forEach((e) => {
    let poster = e.poster_path;
    let title = e.title;
    let comment = e.overview;
    let avg = e.vote_average;
    let url = title.replaceAll(" ", "-");
    // console.log(url);
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    // div.setAttribute("id", e.id + "-" + url);
    div.setAttribute("id", e.id);

    let img = document.createElement("img");
    img.setAttribute("class", "poster");
    img.setAttribute("src", "https://image.tmdb.org/t/p/w500/" + poster);

    let h = document.createElement("h5");
    h.setAttribute("class", "title");
    h.append(title);
    // h.textContent = title;

    let span = document.createElement("span");
    span.setAttribute("class", "comment");
    let length = 150;
    if (comment.length > length) {
      comment = comment.substr(0, length - 1) + "...";
    }
    span.append(comment);

    let p = document.createElement("p");
    p.setAttribute("class", "avg");
    p.textContent = "평점 : ";
    p.append(avg);

    document.querySelector(".cardContainer").append(div);
    div.appendChild(img);
    div.appendChild(h);
    div.appendChild(p);
    div.appendChild(span);
  });
}

document.querySelector("#searchBtn").addEventListener("click", function (e) {
  return search();
});

document.querySelector("#searchInput").addEventListener("keyup", function (e) {
  if (e.keyCode == 13 || e.which == 13) {
    return search();
  }
});

function search() {
  let inputVal = document.querySelector("#searchInput").value;
  console.log(inputVal);

  let newData = [];
  let fil = [];
  let have = false;
  fil = datas.filter((e) => {
    if (e.title.includes(inputVal)) {
      have = true;
      return e;
    }
  });
  if (have) {
    appendFunc(fil);
  } else {
    document.querySelector(".cardContainer").innerHTML = "";
    let non = document.createElement("div");
    non.setAttribute("class", "searchNone");
    non.textContent = "검색 결과가 없습니다.";
    return document.querySelector(".cardContainer").append(non);
  }

  console.log(fil);
}

//카드 클릭하면 해당 정보 보여주기
let gogo;
document
  .querySelector(".cardContainer")
  .addEventListener("click", function (e) {
    console.log(e.target);

    if (e.target.className != "cardContainer" && e.target.className == "card") {
      gogo = e.target.id;
      alert("영화 id : " + e.target.id);
      window.location.href =
        "https://www.themoviedb.org/movie/" + gogo + "?language=ko";
    } else if (
      e.target.className != "cardContainer" &&
      e.target.parentNode.className == "card"
    ) {
      gogo = e.target.parentNode.id;
      alert("영화 id : " + e.target.parentNode.id);
      window.location.href =
        "https://www.themoviedb.org/movie/" + gogo + "?language=ko";
    } else {
    }
  });

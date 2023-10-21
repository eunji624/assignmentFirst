let temp = ``;
let total;
let searchTotal;
let isSearch = false;
let datas = [];
let searchResult = [];
let input = document.querySelector("#searchInput");
let num = 1;
let searchUrl;
let url;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWFiMzdhNmIxYTkzZDIzOTY1NGZiY2ZmM2VhOWRkMCIsInN1YiI6IjY1MmY2ZjU0MzU4ZGE3NWI1YzBkNzdhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0picm_azk3-QIu74ME7GpG1oTeQ5H4bGm7tRS-76--A",
  },
};

//input 자동 커서
input.focus();

//첫 화면에 띄울 데이터 가져오기
function getData() {
  url = `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${num}`;
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      total = response.total_pages;
      datas = response.results;
      appendFunc(datas);
    })
    .catch((err) => console.error(err));
}
getData();

//카드 붙여주는 함수
function appendFunc(da) {
  da.forEach((e) => {
    // //구조분해 할당을 사용하는 이유 __ 데이터를 한번에 다 가져오면 낭비니까 필요한 것만 가져와서 export 해준다.
    // //import 가져다가 사용하려고 씀..
    // //구조분해 할당을 사용하는 이유는 -> 하나의 오브젝트에 여러 데이터들을 넣고, 그 오브젝트를 export 한 다음,

    // //import name from './module.js' 자바스크립트를 연결하려고, html 해서 경로 설정 하는거랑 다를게 없음
    // //자바스크립트 끼리 연결 할때에는 얘를 사용한다.
    // //{여기 안에 있는애들은 다 함수}
    // //반대편 자바스크립트 보내려면 export 사용해야함.
    // //

    // let { poster, title, comment, avg } = obj;
    let { poster_path, title, overview, vote_average } = e;
    // console.log(poster_path, title, overview, vote_average);
    //글줄임 기능
    let length = 150;
    if (overview.length > length) {
      overview = overview.substr(0, length - 1) + "...";
    }
    if (poster_path !== null) {
      temp += `
      <div class="card" id = ${e.id}>
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="" />
        <h5 class="title">${title}</h5>
        <p class="avg">평점 : ${vote_average}</p>
        <span class="comment">${overview}</span>
      </div>
    `;
    } else {
      temp += `
      <div class="card" id = ${e.id}>
        <img class="poster" src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg?w=1800" alt="" />
        <h5 class="title">${title}</h5>
        <p class="avg">평점 : ${vote_average}</p>
        <span class="comment">${overview}</span>
      </div>
    `;
    }

    document.querySelector(".cardContainer").innerHTML = temp;
  });
}

//more버튼 누르면  more 함수 실행__ 데이터 더 없으면 버튼 없게
document.querySelector("#more").addEventListener("click", () => more());

//추가 데이터 가져와서 붙여주기.
function more() {
  if (!isSearch && num < total) {
    num++;
    getData();
  } else if (isSearch && num < searchTotal) {
    num++;
    search();
  }
}

//검색 버튼 누르면 인풋값 가져오는 함수 실행
document.querySelector("#searchBtn").addEventListener("click", function () {
  num = 1; //인풋값이 바뀌었을때, url 주소 끝 페이지 번호 바꿔주기
  return search();
});
//엔터키 입력하면 인풋값 가져오는 함수 실행
document
  .querySelector("#searchInput")
  .addEventListener("keypress", function (e) {
    if (e.keyCode == 13 || e.which == 13) {
      console.log("엔터");
      num = 1;
      return search();
    }
  });

//인풋값 가져오는 함수
async function search() {
  //인풋 값이 달라지면, num도 다시 1로 초기화.
  isSearch = true;
  let inputVal = input.value;
  console.log(inputVal);
  //인풋 없으면 검색어 입력하라고 알러트
  if (!inputVal) {
    return alert("검색어를 입력하세요");
  }

  //한글 안깨지게 encodeURI()
  // inputVal = encodeURI(inputVal);
  searchUrl = `https://api.themoviedb.org/3/search/movie?query=${inputVal}&include_adult=false&language=ko-KR&page=${num}`;
  console.log(searchUrl);

  //검색결과 가져올 전체 데이터
  fetch(searchUrl, options)
    .then((response) => response.json())
    .then(function (response) {
      searchResult = response.results;
      console.log("데이터배열 =>", searchResult.length);
      searchTotal = response.total_pages;
      console.log("전체페이지=>", searchTotal);
      //검색 결과 존재하지 않으면
      if (searchResult.length === 0) {
        temp = "";
        let noResult = `<h2 class = "noResult"> 검색 결과가 없습니다. 😢 </h2>`;
        document.querySelector(".cardContainer").innerHTML = noResult;
        document.querySelector("#more").classList.add("hide");
      } //검색 결과가 존재 하면,
      else {
        console.log("결과 있음");
        //전체 페이지가 1이고, 현재페이지도 1일때.
        if (searchTotal === 1 && num === 1) {
          temp = "";
          console.log("1개가 끝");
          document.querySelector("#more").classList.add("hide");
        } //검색 결과의 마지막 페이지 일때.
        else if (num === searchTotal && num > 1) {
          console.log("데이터 마지막");
          document.querySelector("#more").classList.add("hide");
        } //현재 페이지는 1, 전체 페이지는 1보다 크면
        else if (num === 1 && num < searchTotal) {
          console.log("n개의 페이지 중 1번째");
          temp = "";
          document.querySelector("#more").classList.remove("hide");
        } //현재 페이지는 1이 아닌ㄴ데, 전체 페이지는 현재 페이지보다 크면
        else if (num < searchTotal && num !== 1) {
          document.querySelector("#more").classList.remove("hide");
        }
        console.log("현재 페이지 =>", num);
        appendFunc(searchResult);
      }
    })
    .catch((err) => console.error(err));
}

//카드 클릭하면 해당 정보 보여주기
document
  .querySelector(".cardContainer")
  .addEventListener("click", function clickShow(e) {
    let name = e.target.className;
    let parentName = e.target.parentNode.className;

    if (name != "cardContainer" && name == "card") {
      alert("영화 id : " + e.target.id);
      locat(e.target.id);
    } else if (name != "cardContainer" && parentName == "card") {
      alert("영화 id : " + e.target.parentNode.id);
      locat(e.target.parentNode.id);
    }
  });

//클릭한 카드 상세 정보 페이지로 이동
function locat(goto) {
  window.location.href = `https://www.themoviedb.org/movie/${goto}?language=ko`;
}

//화살표 누르면 좌표 맨 위로
document.querySelector(".upIconWarp").addEventListener("click", function () {
  window.scrollTo(0, 0);
});

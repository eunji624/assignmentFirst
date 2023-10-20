//인풋값 가져오는 함수
function search() {
  if (num === 1) {
    temp = "";
  }

  let inputVal = input.value;
  //한글 안깨지게 encodeURI()
  inputVal = encodeURI(inputVal);
  searchUrl = `https://api.themoviedb.org/3/search/movie?query=${inputVal}&include_adult=false&language=ko-KR&page=${num}`;

  isSearch = true;
  //검색결과 가져올 전체 데이터
  fetch(searchUrl, options)
    .then((response) => response.json())
    .then(function (response) {
      searchResult = response.results;
      searchTotal = response.total_pages;
      appendFunc(searchResult);
    })
    .catch((err) => console.error(err));
}

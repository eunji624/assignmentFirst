const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWFiMzdhNmIxYTkzZDIzOTY1NGZiY2ZmM2VhOWRkMCIsInN1YiI6IjY1MmY2ZjU0MzU4ZGE3NWI1YzBkNzdhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0picm_azk3-QIu74ME7GpG1oTeQ5H4bGm7tRS-76--A",
  },
};

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

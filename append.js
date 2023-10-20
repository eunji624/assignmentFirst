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
    let obj = {
      poster: e.poster_path,
      title: e.title,
      comment: e.overview,
      avg: e.vote_average,
    };

    let { poster, title, comment, avg } = obj;

    //글줄임 기능
    let length = 150;
    if (comment.length > length) {
      comment = comment.substr(0, length - 1) + "...";
    }

    temp += `
      <div class="card" id = ${e.id}>
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${poster}" alt="" />
        <h5 class="title">${title}</h5>
        <p class="avg">평점 : ${avg}</p>
        <span class="comment">${comment}</span>
      </div>
    `;

    document.querySelector(".cardContainer").innerHTML = temp;
  });
}

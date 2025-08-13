// js/index.js

$(document).ready(function () {
  const GhibliAPI = "https://ghibliapi.vercel.app/films";
  const moviesContainer = $(".movies");
  const loading = $(".loading");

  // 1. 영화 정보 API로 가져오기
  $.ajax({
    url: GhibliAPI,
    method: "GET",
    success: function (movies) {
      loading.hide();
      movies.forEach(function (movie) {
        const movieCard = `
          <div class="movie">
            <h3>${movie.title}</h3>
            <p><strong>Original Title:</strong> ${movie.original_title}</p>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Release Year:</strong> <span class="year">${
              movie.release_date
            }</span></p>
            <p>${movie.description.substring(0, 100)}...</p>
            <a href="html/detail.html?id=${
              movie.id
            }" class="detail-link">자세히 보기</a>
          </div>
        `;
        moviesContainer.append(movieCard);
      });
    },
    error: function () {
      loading.text("영화를 불러오는 데 실패했습니다.");
    },
  });

  // 2. 로그인 상태 확인 및 UI 업데이트
  const loggedInUser =
    JSON.parse(sessionStorage.getItem("loggedInUser")) ||
    JSON.parse(localStorage.getItem("rememberedUser"));

  if (loggedInUser) {
    updateUIAfterLogin(loggedInUser.username);
  }

  // 3. 이벤트 핸들러 설정
  $("#openLoginPopup").click(function () {
    // 로그인 창을 팝업으로 띄우기
    window.open("html/login.html", "loginPopup", "width=500,height=700");
  });

  $("#moveRegister").click(function () {
    window.location.href = "html/register.html";
  });

  $("#logout").click(function () {
    sessionStorage.removeItem("loggedInUser");
    localStorage.removeItem("rememberedUser");
    alert("로그아웃 되었습니다.");
    window.location.reload();
  });
});

// 로그인 성공 시 UI 변경 함수
function updateUIAfterLogin(username) {
  $(".user-info").text(`${username}님, 환영합니다!`).show();
  $("#openLoginPopup, #moveRegister").hide();
  $("#logout").show();
}

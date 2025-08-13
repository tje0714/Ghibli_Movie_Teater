// js/detail.js

$(document).ready(function () {
  const loading = $(".loading");
  const movieDetail = $("#movieDetail");
  const errorMessage = $("#errorMessage");

  // URL에서 영화 ID 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (!movieId) {
    loading.hide();
    errorMessage.show();
    return;
  }

  const GhibliDetailAPI = `https://ghibliapi.vercel.app/films/${movieId}`;

  // 특정 영화 정보 API로 가져오기
  $.ajax({
    url: GhibliDetailAPI,
    method: "GET",
    success: function (movie) {
      loading.hide();
      movieDetail.show();

      // 데이터 채우기
      document.title = `🎬 ${movie.title}`;
      $("#moviePoster").attr("src", movie.image).attr("alt", movie.title);
      $("#movieTitle").text(movie.title);
      $("#movieYear").text(`(${movie.release_date})`);
      $("#movieDirector").text(movie.director);
      $("#movieProducer").text(movie.producer);
      $("#movieRelease").text(movie.release_date);
      $("#movieRuntime").text(`${movie.running_time} minutes`);
      $("#movieDescription").text(movie.description);
    },
    error: function () {
      loading.hide();
      errorMessage.show();
    },
  });
});

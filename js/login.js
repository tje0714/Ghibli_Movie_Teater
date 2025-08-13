$(function () {
  $("#login").click();
  $("#goToSignup").click(goToSignup);
});

function goToSignup() {
  opener.location.href = "register.html";
  window.close(); //현재 로그인 페이지 닫기
}

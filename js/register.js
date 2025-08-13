$(function () {
  $("#signup").click(signup);
  $("#goToLogin").click(gotoLogin);
});
function signup() {
  hideMessages();

  const username = $("#username").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();

  // 사용자 정보 저장
  const users = JSON.parse(localStorage.getItem("gbUSers") || "[]");

  const newUser = {
    id: Date.now(), //ms 값을 이용하여 고객 가입 번호 활용
    username: username,
    email: email,
    password: password,
    createAt: new Date().toLocaleString("ko-KR"),
  };

  users.push(newUser); //자바스크립트에서 localStorage 에서 가져온 리스트에 추가

  //추가된 데이터를 localstorage 업로드

  // localStorage.setItem(JSON.stringify(users));
  // Uncaught TypeError: Failed to execute 'setItem' on 'Storage':
  //  2 arguments required, but only 1 present
  // setItem() 내부 파라미터 (=매개변수)가 2개가 들어가야하는데 오직 하나만 들어갔습니다.
  // 그래서 크롬 storage 저장하는데 문제가 발생했습니다.

  localStorage.setItem("gbUSers", JSON.stringify(users));
  alert("회원가입이 완료되었습니다.");
  window.location.href = "index.html";
}
function hideMessages() {}
function gotoLogin() {
  window.open("login.html", "_blank", "width=450,height=600");
  window.location.href = "../index.html";
}

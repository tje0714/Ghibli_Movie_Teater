// js/login.js

$(document).ready(function () {
  // 로그인 버튼 클릭
  $("#login").click(function () {
    const username = $("#username").val();
    const password = $("#password").val();
    const rememberMe = $("#rememberMe").is(":checked");
    if (!username || !password) {
      showError("사용자명과 비밀번호를 입력하세요.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      const userToStore = { username: foundUser.username };

      // 로그인 상태 유지 체크 시 localStorage에, 아니면 sessionStorage에 저장
      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify(userToStore));
      } else {
        sessionStorage.setItem("loggedInUser", JSON.stringify(userToStore));
      }

      showSuccess("로그인 성공!");

      // 부모 창(index.html)의 UI 업데이트 함수 호출 후 팝업 닫기
      if (window.opener && !window.opener.closed) {
        window.opener.updateUIAfterLogin(foundUser.username);
      }
      setTimeout(() => window.close(), 1000);
    } else {
      showError("사용자명 또는 비밀번호가 올바르지 않습니다.");
    }
  });

  // 회원가입 페이지로 이동
  $("#goToSignup").click(() => (window.location.href = "register.html"));
});

// 팝업 닫기 함수 (HTML의 onclick에서 호출)
function closePopup() {
  window.close();
}

function showError(message) {
  $("#errorMessage").text(message).slideDown();
  setTimeout(() => $("#errorMessage").slideUp(), 3000);
}
function showSuccess(message) {
  $("#successMessage").text(message).slideDown();
}

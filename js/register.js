// js/register.js

$(document).ready(function () {
  const errorMessage = $("#errorMessage");
  const successMessage = $("#successMessage");
  const passwordStrength = $("#passwordStrength");

  // 비밀번호 입력 시 강도 체크
  password.on("input", function () {
    const strength = checkPasswordStrength($(this).val());
    passwordStrength.text(`비밀번호 강도: ${strength.text}`);
    passwordStrength
      .removeClass()
      .addClass(`password-strength ${strength.class}`);
  });

  // 회원가입 버튼 클릭
  $("#signup").click(function () {
    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    // 유효성 검사
    if (!username || !email || !password || !confirmPassword) {
      showError("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      showError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 사용자 목록 가져오기 (없으면 빈 배열)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 사용자명 또는 이메일 중복 확인
    if (users.some((user) => user.username === username)) {
      showError("이미 사용 중인 사용자명입니다.");
      return;
    }
    if (users.some((user) => user.email === email)) {
      showError("이미 등록된 이메일입니다.");
      return;
    }

    // 새 사용자 추가
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    showSuccess("회원가입 성공! 로그인 페이지로 이동합니다.");
    setTimeout(() => (window.location.href = "login.html"), 1500);
  });

  // 로그인 페이지로 이동 버튼
  $("#goToLogin").click(function () {
    window.location.href = "login.html";
  });

  // 에러/성공 메시지 표시 함수
  function showError(message) {
    errorMessage.text(message).slideDown();
    setTimeout(() => errorMessage.slideUp(), 3000);
  }
  function showSuccess(message) {
    successMessage.text(message).slideDown();
  }

  // 비밀번호 강도 체크 함수
  function checkPasswordStrength(password) {
    let strength = { text: "약함", class: "strength-weak" };
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      strength = { text: "강함", class: "strength-strong" };
    } else if (password.length >= 6) {
      strength = { text: "중간", class: "strength-medium" };
    }
    return strength;
  }
});

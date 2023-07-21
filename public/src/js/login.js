//get the dom elements
const loginForm = document.getElementById("login");
const loginformPassInput = document.getElementById("login-password");
const loginformPassToggler = document.getElementById(
  "loginFormPasswordToggler"
);

//login process
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  //check the user is registerd or not registered
  let formData = new FormData(e.target);
  let formDataObject = Object.fromEntries(formData.entries());
  const { username_email, password } = formDataObject;
  let lsData = getData("user");
  let findUser = lsData.find(
    (user) =>
      user.email === username_email ||
      (user.username === username_email && user.password === password)
  );

  //add validation errors
  if (!username_email || !password) {
    alertArea.innerHTML = WarnalertMassage(
      "All fields are required ! please enter a username or email and password"
    );
  } else if (!findUser) {
    alertArea.innerHTML = WarnalertMassage(
      "This username and password are not registered"
    );
  } else {
    // authenticate the user to dashboard and database and redirect to dashboard
    const user = { ...findUser, is_logged_in: true };
    window.location.href = "/public/dashboard.html";
    localStorage.setItem("isLoggedIn", "true");
  }
});

//password show hide
loginformPassToggler.addEventListener("click", function (e) {
  e.preventDefault();
  let loginFormPassAttr = loginformPassInput.getAttribute("type");

  if (loginFormPassAttr == "password") {
    loginformPassInput.setAttribute("type", "text");
    loginformPassToggler.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    loginformPassInput.setAttribute("type", "password");
    loginformPassToggler.classList.replace("fa-eye", "fa-eye-slash");
  }
});

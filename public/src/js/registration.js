//get the dom elements
const registrationForm = document.getElementById("registration");
const alertArea = document.getElementById("alert");
const password = document.getElementById("password");
const conPassword = document.getElementById("con-password");
const passShow = document.getElementById("passShow");

//user registration process
registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  //get the from values
  const formData = new FormData(e.target);
  const formDataObject = Object.fromEntries(formData.entries());
  //data distrucring
  const { f_name, l_name, username, email, password, con_password, agreed } =
    formDataObject;

  //check the username and email are unique or not
  //check email
  let previousEmail = [];
  let storageData = getData("user");
  if (storageData.length > 0) {
    storageData.map((item) => {
      previousEmail.push(item.email);
    });
  }
  //check username
  let previousUsername = [];
  let lsData = getData("user");
  if (lsData.length > 0) {
    lsData.map((item) => {
      previousUsername.push(item.username);
    });
  }

  //add the validation
  if (!f_name || !l_name || !username || !email || !password) {
    alertArea.innerHTML = WarnalertMassage(
      "Sorry ! please fill up all the input fields"
    );
  } else if (!validateEmail(email)) {
    alertArea.innerHTML = WarnalertMassage(
      "You have enterd an invalid email address"
    );
  } else if (!agreed) {
    alertArea.innerHTML = WarnalertMassage(
      "Before register you need to agree with out terms and conditions"
    );
  } else if (password !== con_password) {
    alertArea.innerHTML = WarnalertMassage(
      "Confirmation password does not match ! Please enter again"
    );
  } else if (!validatePassword(password)) {
    alertArea.innerHTML = WarnalertMassage(
      "Password Must need at least 8 character with 1 Capital letter,1 smaill letter and 1 special letter"
    );
  } else if (previousEmail.includes(email)) {
    alertArea.innerHTML = WarnalertMassage(
      "This email is already has been registered"
    );
  } else if (previousUsername.includes(username)) {
    alertArea.innerHTML = WarnalertMassage(
      "This Username already has been registered"
    );
  } else {
    alertArea.innerHTML = successalertMassage(
      "Registration Successful ! Please login with username and password"
    );

    let userData = {
      first_name: f_name,
      last_name: l_name,
      username: username,
      photo: "",
      bio: "",
      cell: "",
      about: "",
      email: email,
      password: password,
      is_active: true,
      is_logged_in: false,
    };

    sendData("user", userData);
    registrationForm.reset();
  }
});

//alert closing
const alertBox = document.querySelector(".alert-box");
const closeButton = document.querySelector(".close-button");
function closeAlert() {
  alertArea.innerHTML = "";
}

//password show hide

passShow.addEventListener("click", function (e) {
  e.preventDefault();
  let passvalue = password.getAttribute("type");
  let conpassvalue = conPassword.getAttribute("type");
  if (passvalue == "password" && conpassvalue == "password") {
    password.setAttribute("type", "text");
    conPassword.setAttribute("type", "text");
    passShow.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    password.setAttribute("type", "password");
    conPassword.setAttribute("type", "password");
    passShow.classList.replace("fa-eye", "fa-eye-slash");
  }
});

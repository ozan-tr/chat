let login = document.getElementById("login");
let signup = document.getElementById("signup");
let main = document.getElementById("main");

let auth = document.getElementById("authMenu");
let messanger = document.getElementById("messanger");

login.style.display = "none";
signup.style.display = "none";
messanger.style.display = "none";

if (localStorage.getItem("TOKEN") !== null) {
  fetch(dbUrl + "check/" + localStorage.getItem("token"), (res) => {
    if (res.status == 200) {
      SIGNED_IN = true;
      enterMessages();
    } else {
      signOut();
    }
  });
}

function loginMenu() {
  main.style.display = "none";
  login.style.display = "flex";
  signup.style.display = "none";
}
function signupMenu() {
  main.style.display = "none";
  login.style.display = "none";
  signup.style.display = "flex";
}

function back() {
  login.style.display = "none";
  signup.style.display = "none";
  main.style.display = "flex";
}

function enterMessages() {
  auth.style.display = "none";
  messanger.style.display = "flex";
}

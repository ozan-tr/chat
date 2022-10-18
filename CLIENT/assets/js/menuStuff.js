let login = document.getElementById("login");
let signup = document.getElementById("signup");
let main = document.getElementById("main");



login.style.display = "none";
signup.style.display = "none";
messanger.style.display = "none";

if (localStorage.getItem("TOKEN")) {
  console.log(dbUrl + "check/" + localStorage.getItem("TOKEN"))
  fetch(dbUrl + "check/" + localStorage.getItem("TOKEN")).then(res=>{
    if (res.status == 200) {
      enterMessages();
      console.log("signed in");
    } else {
      console.log("wrong id")
      signOut();
    }
  })

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






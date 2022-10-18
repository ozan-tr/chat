

let errBox=document.getElementsByClassName("spacer")[0]
let errBox2=document.getElementsByClassName("spacer")[1]


function signOut(){
    localStorage.removeItem("TOKEN")
    SIGNED_IN=false
    USER_DATA=null
    back()
}


function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}



function handleSignup(){
    let u=signup.getElementsByClassName("u")[0].value
    let p=signup.getElementsByClassName("p")[0].value
    let m=signup.getElementsByClassName("m")[0].value

    if(true){
        
    fetch(`${dbUrl}signup/${u}/${p}/${m}`).then(res=>{    
        switch(res.status){
            case 400://user exists
                console.error("User with that mail already exists")
                errBox2.innerText="Mail taken"
                setTimeout(()=>{errBox2.innerText=""},1000)
                break;
            case 200://success
                console.info("User successfully created")
                errBox2.style.color="green"
                errBox2.innerText="Success"
                setTimeout(()=>{
                    errBox2.innerText=""
                    errBox2.style.color="red"
                    back()
                },1000)
                break;
            default://unknown error
                console.error("unknown error code: " + res.status);
                errBox2.innerText="Unknown error"
                setTimeout(()=>{errBox2.innerText=""},1000)
                break;
        }
    })

    }


}

function handleLogin(){
    let u=login.getElementsByClassName("m")[0].value
    let p=login.getElementsByClassName("p")[0].value

    fetch(`${dbUrl}login/${u}/${p}`).then(res=>{
        switch(res.status){
            case 400://wrong password
                console.error("Wrong password")
                errBox.innerText="Wrong password"
                setTimeout(()=>{errBox.innerText=""},1000)
                break;
            case 200://success
                console.info("Signed in")
                errBox.style.color="green"
                errBox.innerText="Success"
                setTimeout(async ()=>{
                    errBox.innerText=""
                    errBox.style.color="red"
                    
                    SIGNED_IN=true
                    let token=await res.json().userId

                    localStorage.setItem("TOKEN", token)

                    console.log("user token: "+token)

                    //TODO: proceed to allah

                    enterMessages()

                },1000)
                break;
            case 404: //user does not exist
                console.error("User does not exist")
                errBox.innerText="User doesn't exist"
                setTimeout(()=>{errBox.innerText=""},1000)
                break;
            default://unknown error
                console.error("unknown error code: " + res.status);
                errBox.innerText="Unknown error"
                setTimeout(()=>{errBox.innerText=""},1000)
                break;
        }
    })
}


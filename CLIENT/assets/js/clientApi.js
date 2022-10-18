function authenticate(){
    if(SIGNED_IN){
        let TOKEN=localStorage.getItem("TOKEN")
        fetch(dbUrl+"client/auth",{headers:{"X-Token":TOKEN}}).then(res=>res.json()).then(data=>{
            if(typeof data.Error!=="undefined"){//if token is invalid
                console.log(data.Error)
                console.log("Signig Out!")
                signOut()
            }else{//token is valid
                console.log(data)
                USER_DATA=data
            }
        })
    }else{
        console.log("Not signed in")
    }


}


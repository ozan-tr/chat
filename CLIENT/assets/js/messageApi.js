
let auth = document.getElementById("authMenu");
let messanger = document.getElementsByClassName("messenger")[0];





function enterMessages() {
    auth.style.display = "none";
    messanger.style.display = "grid";
  
    const friendsDiv = document.getElementsByClassName("recieversList")[0]
    
    fetch(`${dbUrl}getData/${localStorage.getItem("TOKEN")}`).then(re=>re.json()).then(res=>{
  
      console.log(res);
  
      const friends=res.friends
  
      document.getElementsByClassName("senderInfo")[0].innerText=res.username
  
      friends.forEach(friend => {
        let box = document.createElement("button");
        box.classList.add("box")
        box.innerText=friend.username
        box.onclick=()=>{
          CHANNEL=friend.mail
        }
        friendsDiv.appendChild(box)
      });
  
    })
  
  
  
  }


function enterChannel(who){


    refreshMessages()
  }
  
  
  function refreshMessages(){
    
  }



class MessageObject{
    constructor(date,content,sent){
        this.div=document.createElement("div")
        this.div.classList.add("messageObj")
        this.div.innerText=content
        if(this.sent){
            this.div.style.right=0
        }else{
            this.div.style.left=0
        }
        document.getElementsByClassName("m")
    }
}
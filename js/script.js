
const socket = io('http://localhost:8000')

const form=document.getElementById("actionContainer");
const messageInput=document.getElementById("inputId")
const messageContainer=document.querySelector(".container")
const audio = new Audio("ting1.mp3");


const append = (message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == "left"){
        audio.play();
    }
}
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message=messageInput.value
    append(`You : ${message}`,`right`);
    socket.emit("send",message);
    messageInput.value='';
})
const name = prompt("Enter your user name");
socket.emit("new-user-joined" , name);


socket.on("user-joined",name=>{
    append(`${name} joined the chat`,`right`)
})

socket.on("recieve",data=>{
    append(`${data.name} : ${data.message}`,`left`)
})
socket.on("leave",name=>{
    // if(`${name}` == null){
    //     `${name}` = '';
    // }
    append(`${name} : left the chat`,`left`)
})

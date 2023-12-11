const socket = io("http://localhost:3000");
const info = document.getElementById("info")
const socketId = document.getElementById("socketId")
const chatInput = document.getElementById("chatInput")
const chatSendButton = document.getElementById("chatSendButton")
const chat = document.getElementById("chat")

socket.on("connect", () => {
    socketId.innerText = `Your id: ${socket.id}`;
    setInfo("You are connected: ");
});


socket.on("message-received", (data) => {
    setInfo(data.payload);
})

socket.on("message", (data) => {
    chat.innerHTML += `
    <p>${data.id}: ${data.payload}</p>
    `
});

const sendData = (e) => {
    e.preventDefault();
    const data = {
        id: socket.id,
        payload: chatInput.value
    };
    socket.emit("message", data);
}

chatSendButton.addEventListener("click", sendData)

let infoTimeout;

const setInfo = (msg) => {
    info.innerText = `Info: ${msg}`;
    clearTimeout(infoTimeout);
    infoTimeout = setTimeout(() => {
        info.innerText = "Info: ";
    }, 5000);
}
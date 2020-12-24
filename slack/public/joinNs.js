
function joinNs(endpoint){
    if(nsSocket){
        nsSocket.close()
        document.querySelector('#user-input').removeEventListener('submit',formSubmission)
    }
    console.log('going inside wiki endpoint.........')
     nsSocket = io(`http://localhost:9013${endpoint}`);
     nsSocket.on('nsRoomLoad',(nsRooms)=> {
        console.log(nsRooms);
        let roomList = document.querySelector('.room-list');
        roomList.innerHTML = ""
        nsRooms.forEach((room) => {
            roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`
        })
        let roomNodes = document.getElementsByClassName('room')
        Array.from(roomNodes).forEach((elem)=>{
            elem.addEventListener('click',(e)=>{
                joinRoom(e.target.innerText)
            })
        })
        const topRoom = document.querySelector('.room');
        const topRoomName = topRoom.innerText;
         console.log(topRoomName);
         joinRoom(topRoomName)
    })

    nsSocket.on('messageToClients',(msg) => {
                console.log(msg);
                const newMsg = buildHTML(msg);
                document.querySelector('#messages').innerHTML+=newMsg
     })
    document.querySelector('.message-form').addEventListener('submit',formSubmission) 
}

function formSubmission(){
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    nsSocket.emit('newMessageToServer', {text: newMessage}); 
    
}

function buildHTML(msg){

    const convertedDate = new Date(msg.time).toLocaleString();
    const newHTML = `
    <li>
                    <div class="user-image">
                        <img src='${msg.avatar}' />
                    </div>
                    <div class="user-message">
                        <div class="user-name-time">${msg.username} <span>${convertedDate}/span></div>
                        <div class="message-text">${msg.text}</div>
                    </div>
                </li>
    `
    return newHTML;

}
    

























// function joinNs(endpoint){
//     console.log(endpoint);
//     const nsSocket = io('http://localhost:9013${endpoint}')
//     nsSocket.on('nsRoomLoad', (nsRooms)=> {
//         console.log('hey');
//         console.log(nsRooms);
//         let roomList = document.querySelector('.room-list')
//         roomList.innerHTML = "";
//         nsRooms.forEach((room) => {
//             let glpyh;
//             if (room.privateRoom){
//                 glpyh = 'lock'
//             }
//             else {
//                 glpyh = 'globe'
//             }
//             roomList.innerHTML+= `<li class="room"><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`
//         })
//         let roomNodes = document.getElementsByClassName('room');
//         Array.from(roomNodes).forEach((elem) => {
//             elem.addEventListener('click',(e) => {
//                 console.log("Someone clicked on", e.target.innerHTML)
//             })
//         })
//         const topRoom = document.querySelector('.room');
//         const topRoomName = topRoom.innerText;
//         console.log(topRoomName);
//         //joinRoom(topRoomName);
//     })

//     nsSocket.on('messageToClients',(msg) => {
//         console.log(msg);
//         document.querySelector('#messages').innerHTML+=`<li>${msg.text}</li>`
//     })
//     document.querySelector('.message-form').addEventListener('submit', (event) => {
//         event.preventDefault();
//         const newMessage = document.querySelector('#user-message').value;
//         console.log(newMessage);
//         socket.emit('newMessageToServer', {text: newMessage});
//         //console.log('Form was submitted');
//     })
// }

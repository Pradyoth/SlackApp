function joinRoom(roomName){
     nsSocket.emit('joinRoom', roomName,(newNumberOfMembers)=>{
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span>`
     });
     nsSocket.on('historyCatchUp',(history) => {
         console.log(history);
         const messagesUl = document.querySelector('#messages');
         messagesUl.innerHTML = "";
         history.forEach((msg)=>{
             const newMsg = buildHTML(msg);
             const currentMessages = messagesUl.innerHTML;
             messagesUl.innerHTML = currentMessages + newMsg
         })
         messagesUl.scrollTo(0,messagesUl.scrollHeight)
     })

     nsSocket.on('updateMembers',(numMembers)=>{
        document.querySelector('.curr-room-num-users').innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span>`
        document.querySelector('.curr-room-text').innerText = `${roomName}`
     })
     let searchBox = document.querySelector('#search-box');

     searchBox.addEventListener('input',(e)=>{
         console.log(e.target.value);
         let messages = Array.from(document.getElementsByClassName('message-text'));
         console.log(messages);
         messages.forEach((message)=>{
             if(message.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1){
                 message.style.display = "none";
             }
             else {
                 message.style.display = "block";
             }
         })
     })


}
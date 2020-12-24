const socket = io('http://localhost:9005');

// socket.on('messageFromServer', (dataFromServer)=> {
//     console.log(dataFromServer);
//     socket.emit('dataToServer', {data: 'Data from Client'})
// })
// socket.on('joined',(msg)=>{
//     console.log(msg);
// })
socket.on('connect', () => {
    console.log(socket.id);
})

socket.on('nsList', (nsData) => {
    console.log("The list of namespaces has arrived");
    console.log(nsData);
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    console.log(newMessage);
    socket.emit('newMessageToServer', {text: newMessage});
    //console.log('Form was submitted');
})

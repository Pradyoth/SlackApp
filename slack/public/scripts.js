const socket = io('http://localhost:9013');
// const socket2 = io('http://localhost:9011/admin');
// const socket2 = io('http://localhost:9013/wiki');
// const socket3 = io('http://localhost:9013/mozilla');


let nsSocket = ""
socket.on('nsList',(nsData)=>{
    console.log('The list of namespaces has arrived');
    console.log(nsData);
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML += "";
    nsData.forEach((ns)=> {
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"/></div>`
    })
})
console.log(document.getElementsByClassName('namespace'));

setTimeout(function(){
    (Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
        elem.addEventListener('click',(e)=>{
           const nsEndpoint = elem.getAttribute('ns');
           console.log(`${nsEndpoint} I should go to now`)
           joinNs(nsEndpoint)
        })
    }))
     
    joinNs('/wiki');
    
}, 3000);








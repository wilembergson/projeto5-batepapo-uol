let yourName = ''
let errorStatus = ''
let sendName = ''
let loginRead = false

let main = document.querySelector("main")

function chekingName(){
    yourName = document.querySelector(".start-screen input").value
    if(yourName === ''){
        alert('Digite o nome que você quer.')
    }else{
        sendName = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: yourName})
        sendName.catch(errorName)
        getYourName()
    }
}
function getYourName(){
    setInterval(keepConected, 3000)
    setInterval(getMessages, 3000)
    let startPage = document.querySelector('.start-screen')
    startPage.classList.add('start-screen-off')
}
function errorName(error){
    loginRead = false
    alert("Este nome já existe.")
    document.querySelector(".start-screen input").value = ''
}

function keepConected(){
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: yourName})
}

function getMessages(){
    const promesse = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    promesse.then(call)
}
function call(answer){
    const listAnswer = answer.data
    listMessages(listAnswer)
}
function listMessages(list){
    main.innerHTML = ""
    list.forEach(loadMessage);
}
function loadMessage(message){
    let element = ``
    
    if(message.type === 'status'){
        element = `<div class="in-out-message" data-identifier="message">
                        <text>
                            <span style="color: #9c9797;">${message.time}</span> 
                            <span style="font-weight:bold">${message.from}</span> entra na sala...
                        </text>
                    </div>`
    }
    else if(message.type === 'message'){
        element =  `<div class="normal-message" data-identifier="message">
                        <text>
                            <span style="color: #9c9797;">${message.time}(09:22:38)</span> 
                            <span style="font-weight:bold">${message.from}</span> para <span style="font-weight:bold">${message.to}:</span> ${message.text}
                        </text>
                    </div>`
    }
    else if(message.type === 'private_message'){
       element = `<div class="private-message data-identifier="message"">
                    <text>
                        <span style="color: #9c9797;">${message.time}</span> 
                        <span style="font-weight:bold">${message.from}</span> reservadamente para <span style="font-weight:bold">${message.to}: </span>${message.text}
                    </text>
                </div>`
    }
    
    return main.innerHTML += element
}

function showSidebar(){
    const sidebar = document.querySelector("aside")
    sidebar.classList.add('sidebar-on')
}
function hideSidebar(){
    const sidebar = document.querySelector("aside")
    sidebar.classList.remove('sidebar-on')
}

function sendMessage(){
    let label = document.querySelector("footer input")
    const route = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', {
        from: yourName,
        to: 'Todos',
        text: label.value,
        type: 'message'
    })
    getMessages()
    label.value = ''
}
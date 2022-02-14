let yourName = ''
let errorStatus = ''
let sendName = ''

let main = document.querySelector("main")

function getYourName(){
    while(yourName === ''){
        yourName = prompt("Como quer ser chamado")
    }
    sendName = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: yourName})
    sendName.catch(errorName)
}
function errorName(error){
    errorStatus = error.response.status
    console.log(errorStatus)
    
    while(errorStatus === 400){
        yourName = prompt("Este nome já existe. Digite outro.")
        sendName = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: yourName})
        errorStatus = sendName.response.status
        console.log(errorStatus)
    }
}

function keepConected(){
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: yourName})
    console.log('Atualizando...'+yourName)
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
        element = `<div class="in-out-message">
                        <text>
                            <span style="color: #9c9797;">${message.time}</span> 
                            <span style="font-weight:bold">${message.from}</span> entra na sala...
                        </text>
                    </div>`
    }
    else if(message.type === 'message'){
        element =  `<div class="normal-message">
                        <text>
                            <span style="color: #9c9797;">${message.time}(09:22:38)</span> 
                            <span style="font-weight:bold">${message.from}</span> para <span style="font-weight:bold">${message.to}:</span> ${message.text}
                        </text>
                    </div>`
    }
    else if(message.type === 'private_message'){
       element = `<div class="private-message">
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
    label.value = ''
}

getYourName()
setInterval(keepConected, 3000)
setInterval(getMessages, 3000)
getMessages()
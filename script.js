let main = document.querySelector("main")

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

getMessages()
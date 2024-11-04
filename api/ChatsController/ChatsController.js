import api from "../apiconfig";

async function chatHistory(username) {
return new Promise((resolve,reject)=>{
    api.post("/chats/history",{username}).then((response)=>{
        if(response.status === 200){
            resolve(response.data.chats);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}) 
}

export {chatHistory};
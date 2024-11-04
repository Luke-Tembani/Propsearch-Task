import api from "../apiconfig"


async function updateUserData(data) {
    return new Promise((resolve,reject)=>{
        api.post("/update/profile",data).then((response)=>{
            if(response.status === 200){
                resolve("success");
            }else{
                resolve("failed");
            }
        })
        .catch((error)=>{
            console.log(error);
            resolve("error");
        })
    })
    
}

export {updateUserData};
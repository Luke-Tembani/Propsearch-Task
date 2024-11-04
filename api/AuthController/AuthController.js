import api from "../apiconfig"

async function loginUser(data) {
    return new Promise((resolve,reject)=>{
        api.post("/auth/login",{"username":data.username, "password":data.password}).then((response)=>{
            console.log("RESPONSE",response.data);
            if(response.status === 200
            ){
                localStorage.setItem("token",response.data.token);
                resolve("success");
            }else{
                resolve("failed");
            }
        })
        .catch((error)=>{
            console.log(error);
            resolve("error")
        })
    })
    
}

async function registerUser(data) {
    return new Promise((resolve,reject)=>{
        api.post("/auth/register",data)
        .then((response)=>{
            if(response.status === 200){
                resolve("success");
            }else{
                resolve("failed");
            }
        })
        .catch((error)=>{
            console.log(error);
            resolve({message:"error", error:error.response.data})
        })
    })
    
}




export {loginUser, registerUser};
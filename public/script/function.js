// const command = {
//     cd: {run: changeDirectory},
//     mv: {run: moveFolder}
// };


import {Command} from "./hashtable.js";
import {api} from "./fetch.js"
import {creatBinaryTree} from "./dsa.js";

const terminalOutput = document.getElementById("terminal-output");


function helpCommand(){
    let output = "\nCommands:\n"
    for(const key of Object.keys(Command)){
        output += `${key} - ${Command[key].description}\n`;
    };
    return output;
};

function clearCommand(){
    terminalOutput.value = "";
    return "";
}

async function exitCommand(){

    const data = await api("/logout", {method:"POST"});
    if(data.redirect){
        window.location.href = data.redirect;
        return;
    };

    // Fallback if the expected response is missing
    window.location.href = "/";
};

async function createFolder(name, path){
    const data = await api("/create",{
        method: "POST",
        body:JSON.stringify({name, path})
    });
    
    if(!data)return "Unable to create folder";
    return data.path;
};

async function moveFolder(oldPath, newPath, name){
    //const {newPath, oldPath} = req.body; backend pattern
    const data = await api("/move",{
        method: "POST",
        body:JSON.stringify({oldPath, newPath})
    });
    if(!data)return "Unable to create folder";
    if (data.success){
        return data.to;
    }else {
        throw new Error(data.message);
    };

};

async function getTree(){
    const data = await api("/root",{
        method: "GET",
    });
    if(!data) return "Unable to get root";
    if(data.success){
        return data.root
    }else{
        throw new Error(data.message);
    };
};

async function loadingPage(str){
    
};

async function changeDirectory(directory){
    const path = document.getElementById("user-folder-location"); //parent folder will be in this path
    if(directory == null){
        terminalOutput += `Invalid command \n`
        return;
    };
    if(directory === ".."){ // if its not root go to parent folder
       pathArray = path.innerText.split("/");
       pathArray.pop();
       parentPath = "/" + pathArray.join("/");
    }; 

    data = await api("/cd",{
        method: "POST",
        body: JSON.stringify({path: parentPath})
    });
    

};

function bfs(root){
    binaryRoot = creatBinaryTree(root);
    
    let q = [binaryRoot];

    while(q.length>0){
        let current = q.shift()
        terminalOutput.value += `\n ${current.value}`
        if(current.left) q.push(current.left);
        if(current.right) q.push(current.right);
    };
};

export {helpCommand, clearCommand, exitCommand, createFolder, moveFolder, getTree, loadingPage, bfs};
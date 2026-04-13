import {Command} from "./hashtable.js";
import {api} from "./fetch.js"
import {createBinaryTree, dfs, bfs} from "./dsa.js"

const terminalOutput = document.getElementById("terminal-output");


function helpCommand(){
    let output = "\nCommands:\n"
    for(const key of Object.keys(Command)){
        output += `${key} - ${Command[key].description}\n`;
    };
    terminalOutput.value += output;
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

async function changeDirectory(directory, fullCmd){
    const path = document.getElementById("user-folder-location"); //parent folder will be in this path
    if(!directory){
        terminalOutput.value += `Invalid command \n`
        return;
    };
    let data = null;
    if(directory === ".."){ // if its not root go to parent folder
        const pathArray = path.innerText.split("/").filter(Boolean);
        pathArray.pop()
        const parentPath = `/${pathArray.join("/")}`
        data = await api("/cd",{
        method: "POST",
        body: JSON.stringify({path: parentPath})
       });
    }else if(directory.startsWith("/")){ // if directory start with "/" then its an absolute path 
        data = await api("/cd",{
            method: "POST",
            body: JSON.stringify({path:directory})
        });
    }else{ //it menas it just folder name from the children list
        data = await api("/cd",{
            method: "POST",
            body: JSON.stringify({path: `${path.innerText}/${directory}`})
        });
    }; 

    if(data.error){
        terminalOutput.value += ` ${fullCmd}\n invalid path: ${directory}\n`;
        return;
    };
    terminalOutput.value += `${fullCmd}\n`
    path.innerText = data.path;

};

async function runBfs(){
    const root = await getTree()
    terminalOutput.value += `converting non binary tree to binary tree \n ${createBinaryTree.toString()}\n`;
    const binaryTree = createBinaryTree(root);
    terminalOutput.value += `Running bfs to print out the folder name \n ${bfs.toString()} \n`;
    bfs(binaryTree);
};

async function runDFS(){
    const root = await getTree()
    terminalOutput.value += `converting non binary tree to binary tree \n ${createBinaryTree.toString()}\n`;
    const binaryTree = createBinaryTree(root);
    terminalOutput.value += `Running DFS to print out the folder name \n ${dfs.toString()}\n`;
    dfs(binaryTree);
};

export {helpCommand, clearCommand, exitCommand, createFolder, moveFolder, getTree, changeDirectory, loadingPage, runBfs, runDFS};
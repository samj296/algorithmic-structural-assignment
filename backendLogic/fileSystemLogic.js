const TreeNode = require("../models/FileSystem")

function createFolder(parent, node){
    // if there is no parent this node will be treated as root
    let newNode = new TreeNode(node)
    if(parent === null){
         return newNode;
    }else{
        parent.children.push(newNode);
        return newNode;
    };
};

function moveFolder(newPath,oldPath, root){
    const oldPathArray = oldPath.split("/");
    const folderName = oldPathArray[oldPathArray.length - 1];
    const oldParentPath = oldPathArray.slice(0,-1).join("/");

    const oldParent = findNodeByPath(root,oldParentPath);
    const newParent = findNodeByPath(root, newPath);
    if(!oldParent || !newParent){
        throw new Error("Invalid path");
        return;
    };

    //find the actual node
    const node = oldParent.children.find(child => child.value === folderName);
    if(!node){
        //here I will alert the user or throw new error here
        return;
    };
    //remove from old parent
    oldParent.children = oldParent.children.filter(child => child !== node);
    // add to new parent
    newParent.children.push(node);
    // update parent reference
    node.parent = newParent;
};

function findNodeByPath(root, path){
    const pathArray = path.split("/");
    let currentNode = root;
    for(const name of pathArray){
        currentNode = currentNode.children.find(child =>child.value === name);
        if(!currentNode) return null;
    };
    return currentNode;
};

function filePath(node, path){
    if(!node) return;
    let i = 0 ;
    const obj = [];
    let rootPath = ""
    if(path === `/`){
         rootPath = node.value;
    }else{
        rootPath = `${path}/${node.value}`
    };

    const subFolder = [];

    for(child of node.children){
    
            const folderPath = `${rootPath}/${child.value}`
            const folder_file = {
                path: folderPath,
                type: child.type
            };
            subFolder.push(folder_file);
            
    };

    return subFolder;
};

module.exports = {createFolder, moveFolder, filePath, findNodeByPath};
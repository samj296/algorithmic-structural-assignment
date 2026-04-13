// Note: This binary tree does not preserve the original Non-binary structure
// this is just demonstarte the dfs and bfs search
// this is for binary tree

//This module is just for the assignment

//using recursive way to get all node

class TreeNode{
    constructor(value){
        this.value = value;
        this.type = null
        this.children = [];
        this.parent = null;
    };
};


function getAllNode(root, result = []){
    if(!root) return result;

    result.push(root);
    if(root.children && root.children.length>0){
        root.children.forEach(child => {
            getAllNode(child, result)
        });
    };
    return result;
};

function createBinaryTree(root){
    const allNode = getAllNode(root,[]);

    const rootNode = allNode.shift();
    const newRoot = new TreeNode(rootNode.value);

    let current = newRoot;
    for(let child of allNode){
        const newNode = new TreeNode(child.value);
        if(current.left === null){
            current.left = newNode;
        }else if(current.right === null){
            current.right = newNode;
        }else{
            current = current.left;
            current.left = newNode;
        };
    };
    return newRoot;
};

function bfs(binaryRoot){
// this function will return all the folder name with breadth first search method
    let q = [binaryRoot];

    while(q.length>0){
        let current = q.shift()
        terminalOutput.value += `\n ${current.value}`
        if(current.left) q.push(current.left);
        if(current.right) q.push(current.right);
    };
};

function dfs(binaryRoot){ 
   if(!binaryRoot) return;
   let stack = [binaryRoot];

   while(stack.length>0){
        let current = stack.pop();
        terminalOutput.value += current.value + "\n"
        // pushing right first so the left is processed first (LIFO)
        if(current.right) stack.push(current.right);
        if(current.left)stack.push(current.left);
   };
};

export {createBinaryTree, dfs, bfs, TreeNode};

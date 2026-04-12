// Note: This binary tree does not preserve the original Non-binary structure
// this is just demonstarte the dfs and bfs search
// this is for binary tree

//This module is just for the assignment

module.exports = {TreeNode}

//using recursive way to get all node
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

function creatBinaryTree(root){
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

export {creatBinaryTree};
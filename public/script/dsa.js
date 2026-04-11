// Note: This binary tree does not preserve the original Non-binary structure
// this is just demonstarte the dfs and bfs search

//using recursive way to get all node
function getAllNode(root, result = []){
    if(!root) return result;

    result.push(root);
    if(root.children && root.children.length>0){
        root.children.forEach(child => {
            getAllNode(child, result)
        });
    };
    return result
};
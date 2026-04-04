⚠️ Warning: You’re using the most powerful terminal ever created. One wrong move and your imaginary files or folders may vanish into the void.


File System
I was plannig to create the file system with the usual class that we learned in the class

```js
class TreeNode{
    this.value = value;
    this.left = null;
    this.right = null;
};
```
But with this йcan only be able to create only two subfolder or file inside the root and the subfolder but in the file system there can be n number of folders

solution I got from the copilot

```js
class TreeNode{
    this.value = value;
    this.children = [];
    this.parent = null;
};
```
this way the folder can hold as many folder as client wants

To-Do
- [ ] function to grab node from the path client is sending

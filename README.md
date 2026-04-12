<h1>🙏 Welcome to DOOR</h1> 
<h2>(Disk Operating Output Runtime)</h2> 

<strong>⚠️ Mighty Husk Safety Advisory
Warning: Mighty Husk is powerful enough to delete folders that don’t even exist. <br>
Type carefully. <br>
Your imaginary data depends on it.</Strong>

<!-- ⚠️ Warning: You’re using the most powerful terminal (Mighty Husk) ever created. One wrong move and your imaginary files or folders may vanish into the void. -->

# File System
I was plannig to create the file system with the usual class that we learned in the class

```js
class TreeNode{
    this.value = value;
    this.left = null;
    this.right = null;
};
```
But with this  we can only be able to create only two subfolder or file inside the root and the subfolder but in the file system there can be n number of folders

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
- [ ] create signup page
- [x] create login page
- [ ] terminal designing
- [ ] 
# Notes: -
## Why used Boolean in ↓
```js
const pathArray = path.split("/").filter(Boolean);
```
By writing the Boolean we are not passing the value true,
we are passing the Boolean function itself.
And the Boolean function works like this:<br>
Boolean("hello") → true<br>
Boolean("") → false<br>
Boolean(null) → false<br>
Boolean(undefined) → false<br>

When we split path "/root/documents" the result will be <br> 
["", root, documents]
the first element will be an empty string

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;

        while (true) {
            if (current.value > value) {

                if (!current.left) {
                    current.left = newNode;
                    return this;
                }

                current = current.left;
            }
            else if (current.value < value) {
                
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }

                current = current.right;
            }
            else {
                // do nothing
            }
        }

        return this;
    }

    contains(value) {
        if (!this.root) {
            return false;
        }

        let current = this.root;

        while (current) {
            if (current.value > value) {
                current = current.left;
            }
            else if (current.value < value) {
                current = current.right;
            }
            else {
                // A match!!!
                return true;
            }
        }

        return false;
    }

    levelOrderTraversal() {
        let node = this.root;
        let queue = [];
        let data = [];

        if (!node) {
            return data;
        }

        queue.push(node);

        while(queue.length) {
            node = queue.shift();
            data.push(node.value);

            if (node.left) {
                queue.push(node.left);
            }
            
            if (node.right) {
                queue.push(node.right);
            }
        }

        return data;
    }

    inOrderTraversal(node = this.root, data = []) {

        if (node) {
            this.inOrderTraversal(node.left, data);
            data.push(node.value);
            this.inOrderTraversal(node.right, data);
        }

        return data;
    }
}

const tree = new BinarySearchTree();

tree.insert(3);
tree.insert(6);
tree.insert(1);
tree.insert(8);

console.log(tree.contains(6));
console.log(tree.contains(61));

console.log(tree.levelOrderTraversal());
console.log(tree.inOrderTraversal());

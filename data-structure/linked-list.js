
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    prepend(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
        return this;
    }

    delete(value) {
        if (!this.head) {
            return false;
        }

        if (this.head.value === value) {
            this.head = this.head.next;
            this.length--;

            if (!this.head) {
                this.tail = null;
            }

            return true;
        }

        let current = this.head;

        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                this.length--;

                if (!current.next) {
                    this.tail = current;
                }

                return true;
            }
            current = current.next;
        }

        return false;
    }

    find(value) {
        let current = this.head;

        while (current) {
            if (current.value === value) {
                return current;
            }

            current = current.next;
        }

        return null;
    }

    toArray() {
        const elements = [];

        let current = this.head;

        while (current) {
            elements.push(current.value);
            current = current.next;
        }

        return elements;
    }
}

const list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);
list.prepend(4);

console.log(list.toArray());

console.log(list.find(2));

console.log(list.delete(4));
console.log(list.toArray());

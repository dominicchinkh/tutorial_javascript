class PriorityQueue {
    #heap

    constructor() {
        this.#heap = [];
    }

    #parent(index) {
        return Math.floor((index - 1) / 2);
    }

    #left(index) {
        return 2 * index + 1;
    }

    #right(index) {
        return 2 * index + 1;
    }

    #swap(i, j) {
        [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
    }

    #heapifyUp() {
        let index = this.#heap.length - 1;

        while (
            index > 0 &&
            this.#heap[this.#parent(index)].priority > this.#heap[index].priority
        ) {
            this.#swap(index, this.#parent(index));
            index = this.#parent(index);
        }
    }

    #heapifyDown() {
        let index = 0;
        const length = this.#heap.length;

        while (this.#left(index) < length) {
            let smallest = this.#left(index);
            const rightIndex = this.#right(index);

            if (
                rightIndex < length &&
                this.#heap[rightIndex].priority < this.#heap[smallest].priority
            ) {
                smallest = rightIndex;
            }

            if (this.#heap[index].priority <= this.#heap[smallest].priority) {
                break;
            }

            this.#swap(index, smallest);
            index = smallest;
        }
    }

    enqueue(element, priority) {
        const node = { element, priority };
        this.#heap.push(node);
        this.#heapifyUp();
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        if (this.#heap.length == 1) {
            return this.#heap.pop().element;
        }

        const root = this.#heap[0].element;

        this.#heap[0] = this.#heap.pop();
        this.#heapifyDown();

        return root;
    }
    
    peek() {
        return this.isEmpty()? null: this.#heap[0].element;
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.#heap.length;
    }
}

const tasks = new PriorityQueue();

// Enqueue tasks with priorities (1 is highest priority)
tasks.enqueue("Clean the house", 4);
tasks.enqueue("Fix critical production bug", 1);
tasks.enqueue("Respond to routine emails", 3);
tasks.enqueue("Deploy security patch", 2);

console.log("Current queue size:", tasks.size());   // Output: 4
console.log("Next task to handle:", tasks.peek());  // Output: "Fix critical production bug"

console.log("\n--- Processing Tasks by Priority ---");
while (!tasks.isEmpty()) {
    console.log(tasks.dequeue());
}

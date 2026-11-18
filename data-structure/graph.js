class Graph {
    #adjacencyList;
    #isDirected;

    constructor(isDirected = false) {
        this.#adjacencyList = new Map();
        this.#isDirected = isDirected;
    }

    addVertex(vertex) {
        if (!this.#adjacencyList.has(vertex)) {
            this.#adjacencyList.set(vertex, []);
            return true;
        }

        return false;
    }

    addEdge(vertex1, vertex2) {
        if (!this.#adjacencyList.has(vertex1)) {
            this.addVertex(vertex1);
        }

        if (!this.#adjacencyList.has(vertex2)) {
            this.addVertex(vertex2);
        }

        const list1 = this.#adjacencyList.get(vertex1);
        if (!list1.includes(vertex2)) {
            list1.push(vertex2);
        }

        if (!this.#isDirected) {
            const list2 = this.#adjacencyList.get(vertex2);
            if (!list2.includes(vertex1)) {
                list2.push(vertex1);
            }
        }
    }

    removeEdge(vertex1, vertex2) {
        if (this.#adjacencyList.has(vertex1)) {
            this.#adjacencyList.set(
                vertex1,
                this.#adjacencyList.get(vertex1).filter(v => v !== vertex2)
            )
        }

        if (!this.#isDirected) {
            if (this.#adjacencyList.has(vertex2)) {
                this.#adjacencyList.set(
                    vertex2,
                    this.#adjacencyList.get(vertex2).filter(v => v !== vertex1)
                )
            }   
        }
    }

    removeVertex(vertex) {
        if (!this.#adjacencyList.has(vertex)) {
            return false;
        }

        for (const [v, neighbors] of this.#adjacencyList.entries()) {
            if (neighbors.includes(vertex)) {
                this.removeEdge(v, vertex);
            }
        }

        this.#adjacencyList.delete(vertex);
        return true;
    }

    breadthFirstSearch(startVertex) {
        if (!this.#adjacencyList.has(startVertex)) {
            return [];
        }

        const visited = new Set();
        const result = [];
        const queue = [startVertex];

        visited.add(startVertex);

        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);

            for (const neighbor of this.#adjacencyList.get(current)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    depthFirstSearch(startVertex) {
        if (!this.#adjacencyList.has(startVertex)) {
            return [];
        }

        const visited = new Set();
        const result = [];
        const adjacencyList = this.#adjacencyList;

        function dfs(vertex) {
            visited.add(vertex);
            result.push(vertex);

            for (const neighbor of adjacencyList.get(vertex)) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor);
                }
            }
        }

        dfs(startVertex);
        return result;
    }

    print() {
        for (const [vertex, neighbors] of this.#adjacencyList.entries()) {
            console.log(`${vertex} -> ${neighbors.join(", ")}`)
        }
    }
}

const graph = new Graph(true);

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");

// graph.removeEdge("D", "E");
// graph.removeVertex("C");

graph.print();

console.log("BFS:", graph.breadthFirstSearch("A"));
console.log("DFS:", graph.depthFirstSearch("A"));

class Graph {
    #adjacentList;
    #isDirected;

    constructor(isDirected) {
        this.#adjacentList = new Map();
        this.#isDirected = isDirected;
    }

    addVertex(vertex) {
        if (!this.#adjacentList.has(vertex)) {
            this.#adjacentList.set(vertex, []);
            return true;
        }

        return false;
    }

    addEdge(vertex1, vertex2) {
        if (!this.#adjacentList.has(vertex1)) {
            this.addVertex(vertex1);
        }

        if (!this.#adjacentList.has(vertex2)) {
            this.addVertex(vertex2);
        }

        const list1 = this.#adjacentList.get(vertex1);
        if (!list1.includes(vertex2)) {
            list1.push(vertex2);
        }

        if (!this.#isDirected) {
            const list2 = this.#adjacentList.get(vertex2);
            if (!list2.includes(vertex1)) {
                list2.push(vertex1);
            }
        }
    }

    removeEdge(vertex1, vertex2) {
        if (this.#adjacentList.has(vertex1)) {
            this.#adjacentList.set(
                vertex1,
                this.#adjacentList.get(vertex1).filter(v => v !== vertex2)
            )
        }

        if (!this.#isDirected) {
            if (this.#adjacentList.has(vertex2)) {
                this.#adjacentList.set(
                    vertex2,
                    this.#adjacentList.get(vertex2).filter(v => v !== vertex1)
                )
            }
        }
    }

    breadthFirstSearch(startVertex) {
        if (!this.#adjacentList.has(startVertex)) {
            return [];
        }

        const visited = new Set();
        const result = [];
        const queue = [startVertex];

        visited.add(startVertex);

        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);

            for (const neighbor of this.#adjacentList.get(current)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    depthFirstSearch(startVertex) {
        if (!this.#adjacentList.has(startVertex)) {
            return [];
        }

        const visited = new Set();
        const result = [];
        const adjacentList = this.#adjacentList

        function dfs(vertex) {
            visited.add(vertex);
            result.push(vertex);

            for (const neighbor of adjacentList.get(vertex)) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor);
                }
            }
        }

        dfs(startVertex);
        return result;
    }

    print() {
        for (const [vertex, neighbors] of this.#adjacentList.entries()) {
            console.log(`${vertex} -> ${neighbors.join(", ")}`);
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

graph.removeEdge("D", "E");

graph.print();

console.log("BFS:", graph.breadthFirstSearch("A"));
console.log("DFS:", graph.depthFirstSearch("A"));

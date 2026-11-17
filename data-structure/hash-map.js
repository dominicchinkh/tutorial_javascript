class HashMap {

    #capacity;
    #size;
    #buckets;

    constructor(capacity) {
        this.#capacity = capacity;
        this.clear();
    }

    #hash(key) {
        let hash = 0;
        
        const stringKey = String(key);
        for (let i = 0; i < stringKey.length; i++) {
            hash = (hash + stringKey.charCodeAt(i) * (i + 1)) % this.#capacity;
        }

        return hash;
    }

    set(key, value) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.#size++;
    }

    get(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }

        return undefined;
    }

    has(key) {
        return this.get(key) != undefined;
    }

    remove(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.#size --;
                return true;
            }
        }

        return false;
    }

    clear() {
        this.#buckets = new Array(this.#capacity).fill(null).map(() => []);
        this.#size = 0;
    }
}

const map = new HashMap(11);

map.set("name", "Alice");
map.set("age", 30);
map.set("city", "Canberra");

console.log(map.get("name"));
console.log(map.get("age"));
console.log(map.get("city"));

console.log(map.has("name"));
console.log(map.has("email"));

map.set("age", 32);
console.log(map.get("age"));

console.log(map.has("city"));
console.log(map.remove("city"));
console.log(map.has("city"));

// console.log(map.sizeCount);

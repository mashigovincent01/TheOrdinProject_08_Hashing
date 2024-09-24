class HashMap {
    constructor(loadFactor = 0.75) {
        this.buckets = new Array(16);
        this.size = 0;
        this.loadFactor = loadFactor;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
        }
        return hashCode;
    }

    set(key, value) {
        if (this.size / this.buckets.length >= this.loadFactor) {
            this._resize();
        }

        const index = this.hash(key);
        this._checkIndexBounds(index); // Check index bounds before accessing

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value; // Update value if key already exists
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;
    }

    get(key) {
        const index = this.hash(key);
        this._checkIndexBounds(index); // Check index bounds before accessing

        const bucket = this.buckets[index];
        if (!bucket) return null;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null; // Key not found
    }

    has(key) {
        const index = this.hash(key);
        this._checkIndexBounds(index); // Check index bounds before accessing

        const bucket = this.buckets[index];
        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false; // Key not found
    }

    remove(key) {
        const index = this.hash(key);
        this._checkIndexBounds(index); // Check index bounds before accessing

        const bucket = this.buckets[index];
        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1); // Remove the key-value pair
                this.size--;
                return true; // Successfully removed
            }
        }
        return false; // Key not found
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(16);
        this.size = 0;
    }

    keys() {
        const allKeys = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let [key] of bucket) {
                    allKeys.push(key);
                }
            }
        }
        return allKeys;
    }

    values() {
        const allValues = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let [, value] of bucket) {
                    allValues.push(value);
                }
            }
        }
        return allValues;
    }

    entries() {
        const allEntries = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                for (let entry of bucket) {
                    allEntries.push(entry);
                }
            }
        }
        return allEntries;
    }

    _resize() {
        const oldBuckets = this.buckets;
        this.buckets = new Array(oldBuckets.length * 2);
        this.size = 0;

        for (let bucket of oldBuckets) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    this.set(key, value); // Rehash items
                }
            }
        }
    }

    _checkIndexBounds(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
    }
}

module.exports = HashMap;

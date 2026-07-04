class AssetCache {

    constructor(maxSize = 52428800) { // 50MB default

        this.cache = new Map();
        this.maxSize = maxSize;
        this.currentSize = 0;
        this.accessOrder = []; // LRU tracking

    }

    set(key, value) {

        // Remove if exists
        if (this.cache.has(key)) {
            this.currentSize -= this._estimateSize(this.cache.get(key));
            this.accessOrder = this.accessOrder.filter(k => k !== key);
        }

        // Check size before adding
        const valueSize = this._estimateSize(value);
        
        if (this.currentSize + valueSize > this.maxSize) {
            this._evict(valueSize);
        }

        this.cache.set(key, value);
        this.currentSize += valueSize;
        this.accessOrder.push(key);

    }

    get(key) {

        if (!this.cache.has(key)) {
            return null;
        }

        // Update access order for LRU
        this.accessOrder = this.accessOrder.filter(k => k !== key);
        this.accessOrder.push(key);

        return this.cache.get(key);

    }

    has(key) {
        return this.cache.has(key);
    }

    delete(key) {

        if (this.cache.has(key)) {
            this.currentSize -= this._estimateSize(this.cache.get(key));
            this.cache.delete(key);
            this.accessOrder = this.accessOrder.filter(k => k !== key);
        }

    }

    clear() {
        this.cache.clear();
        this.currentSize = 0;
        this.accessOrder = [];
    }

    _estimateSize(value) {

        if (typeof value === 'string') {
            return value.length * 2; // UTF-16
        }

        if (value instanceof ArrayBuffer) {
            return value.byteLength;
        }

        if (value instanceof Uint8Array) {
            return value.length;
        }

        // Check for Image in browser environment
        if (typeof Image !== 'undefined' && value instanceof Image) {
            return (value.width || 0) * (value.height || 0) * 4;
        }

        // Default fallback
        return JSON.stringify(value).length;

    }

    _evict(requiredSpace) {

        while (this.accessOrder.length > 0 && this.currentSize + requiredSpace > this.maxSize) {

            const oldestKey = this.accessOrder.shift();
            const oldValue = this.cache.get(oldestKey);

            this.currentSize -= this._estimateSize(oldValue);
            this.cache.delete(oldestKey);

        }

    }

    getStats() {
        return {
            itemCount: this.cache.size,
            currentSize: this.currentSize,
            maxSize: this.maxSize,
            percentUsed: ((this.currentSize / this.maxSize) * 100).toFixed(2)
        };
    }

}

module.exports = AssetCache;

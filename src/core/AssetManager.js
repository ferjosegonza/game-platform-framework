const AssetLoader = require('./AssetLoader');
const AssetCache = require('./AssetCache');

class AssetManager {

    constructor(cache = null) {

        this.cache = cache || new AssetCache();
        this.loader = new AssetLoader(this.cache);
        this.registry = new Map();
        this.loading = new Map();

    }

    register(name, assetPath, type = 'image') {

        if (this.registry.has(name)) {
            throw new Error(`Asset already registered: ${name}`);
        }

        this.registry.set(name, {
            name,
            path: assetPath,
            type,
            loaded: false,
            asset: null
        });

        return this;

    }

    async preload(name) {

        const asset = this.registry.get(name);

        if (!asset) {
            throw new Error(`Asset not found: ${name}`);
        }

        if (asset.loaded) {
            return asset.asset;
        }

        // Prevent duplicate loading
        if (this.loading.has(name)) {
            return this.loading.get(name);
        }

        const loadPromise = this.loader.load(asset.path, asset.type);

        this.loading.set(name, loadPromise);

        try {
            const loadedAsset = await loadPromise;
            asset.asset = loadedAsset;
            asset.loaded = true;
            this.loading.delete(name);
            return loadedAsset;
        } catch (error) {
            this.loading.delete(name);
            throw error;
        }

    }

    async preloadAll() {

        const promises = [];

        for (const [name, asset] of this.registry) {
            if (!asset.loaded) {
                promises.push(this.preload(name));
            }
        }

        return Promise.all(promises);

    }

    get(name) {

        const asset = this.registry.get(name);

        if (!asset) {
            throw new Error(`Asset not found: ${name}`);
        }

        if (!asset.loaded) {
            console.warn(`Asset not loaded: ${name}. Use preload() first.`);
        }

        return asset.asset;

    }

    async getAsync(name) {

        const asset = this.registry.get(name);

        if (!asset) {
            throw new Error(`Asset not found: ${name}`);
        }

        if (!asset.loaded) {
            await this.preload(name);
        }

        return asset.asset;

    }

    isLoaded(name) {

        const asset = this.registry.get(name);
        return asset ? asset.loaded : false;

    }

    unload(name) {

        const asset = this.registry.get(name);

        if (asset) {
            asset.loaded = false;
            asset.asset = null;
            this.cache.delete(name);
        }

        return this;

    }

    unloadAll() {

        for (const name of this.registry.keys()) {
            this.unload(name);
        }

        return this;

    }

    list() {

        const list = [];

        for (const [name, asset] of this.registry) {
            list.push({
                name,
                type: asset.type,
                loaded: asset.loaded
            });
        }

        return list;

    }

    getStats() {
        return {
            registered: this.registry.size,
            loaded: Array.from(this.registry.values()).filter(a => a.loaded).length,
            cache: this.cache.getStats()
        };
    }

}

module.exports = AssetManager;

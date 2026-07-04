const fs = require('fs');
const path = require('path');

class AssetLoader {

    constructor(cache) {
        this.cache = cache;
        this.supportedTypes = {
            'image': ['png', 'jpg', 'jpeg', 'webp', 'gif'],
            'audio': ['mp3', 'wav', 'ogg', 'm4a'],
            'json': ['json'],
            'sprite': ['png', 'jpg']
        };
    }

    async load(assetPath, type = 'image') {

        // Check cache first
        if (this.cache && this.cache.has(assetPath)) {
            return this.cache.get(assetPath);
        }

        // Validate type
        const ext = path.extname(assetPath).toLowerCase().slice(1);
        if (!this._validateType(type, ext)) {
            throw new Error(`Invalid asset type: ${ext} is not supported for ${type}`);
        }

        let asset;

        if (type === 'image' || type === 'sprite') {
            asset = await this._loadImage(assetPath);
        } else if (type === 'audio') {
            asset = await this._loadAudio(assetPath);
        } else if (type === 'json') {
            asset = await this._loadJson(assetPath);
        } else {
            throw new Error(`Unknown asset type: ${type}`);
        }

        // Cache result
        if (this.cache) {
            this.cache.set(assetPath, asset);
        }

        return asset;

    }

    loadSync(assetPath, type = 'image') {

        // Check cache first
        if (this.cache && this.cache.has(assetPath)) {
            return this.cache.get(assetPath);
        }

        // Validate type
        const ext = path.extname(assetPath).toLowerCase().slice(1);
        if (!this._validateType(type, ext)) {
            throw new Error(`Invalid asset type: ${ext} is not supported for ${type}`);
        }

        let asset;

        if (type === 'json') {
            asset = this._loadJsonSync(assetPath);
        } else {
            throw new Error(`Synchronous loading not supported for ${type}. Use async load() instead.`);
        }

        // Cache result
        if (this.cache) {
            this.cache.set(assetPath, asset);
        }

        return asset;

    }

    _loadImage(assetPath) {

        return new Promise((resolve, reject) => {

            if (typeof document === 'undefined') {
                // Node.js environment - return mock
                resolve({
                    type: 'image',
                    path: assetPath,
                    width: 0,
                    height: 0,
                    data: null
                });
                return;
            }

            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${assetPath}`));
            img.src = assetPath;

        });

    }

    _loadAudio(assetPath) {

        return new Promise((resolve, reject) => {

            if (typeof Audio === 'undefined') {
                // Node.js environment - return mock
                resolve({
                    type: 'audio',
                    path: assetPath
                });
                return;
            }

            const audio = new Audio();
            audio.oncanplaythrough = () => resolve(audio);
            audio.onerror = () => reject(new Error(`Failed to load audio: ${assetPath}`));
            audio.src = assetPath;

        });

    }

    async _loadJson(assetPath) {

        try {
            const data = fs.readFileSync(assetPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Failed to load JSON: ${error.message}`);
        }

    }

    _loadJsonSync(assetPath) {

        try {
            const data = fs.readFileSync(assetPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Failed to load JSON: ${error.message}`);
        }

    }

    _validateType(type, ext) {

        if (!this.supportedTypes[type]) {
            return false;
        }

        return this.supportedTypes[type].includes(ext);

    }

    getSupportedTypes() {
        return this.supportedTypes;
    }

}

module.exports = AssetLoader;

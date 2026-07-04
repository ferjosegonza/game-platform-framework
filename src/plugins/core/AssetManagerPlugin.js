const Plugin = require("../Plugin");
const AssetManager = require("../../core/AssetManager");
const AssetCache = require("../../core/AssetCache");

class AssetManagerPlugin extends Plugin {

    constructor(config = {}) {

        super(config);
        this.assetManager = null;
        this.assetCache = null;

    }

    getName() {
        return "AssetManager";
    }

    install(engine) {

        // Create cache with custom size if provided
        const cacheSize = this.config.cacheSize || 52428800; // 50MB default
        this.assetCache = new AssetCache(cacheSize);

        // Create asset manager
        this.assetManager = new AssetManager(this.assetCache);

        // Register on framework
        engine.assetManager = this.assetManager;

        console.log("✓ AssetManager installed");

    }

    start(engine) {

        // Listen for asset loading events
        engine.events.on("asset.preload", async (payload) => {
            try {
                await this.assetManager.preload(payload.name);
                engine.events.emit("asset.loaded", { name: payload.name });
            } catch (error) {
                engine.events.emit("asset.failed", { name: payload.name, error: error.message });
            }
        });

        console.log("✓ AssetManager started");

    }

    stop(engine) {
        if (this.assetManager) {
            this.assetManager.unloadAll();
        }
        console.log("✓ AssetManager stopped");
    }

}

module.exports = AssetManagerPlugin;

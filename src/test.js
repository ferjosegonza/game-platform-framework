const Framework = require("./core/Framework");

const LoggerPlugin = require("./plugins/core/LoggerPlugin");
const StatisticsPlugin = require("./plugins/core/StatisticsPlugin");
const AssetManagerPlugin = require("./plugins/core/AssetManagerPlugin");

const framework = new Framework();

framework.register(new LoggerPlugin());

framework.register(new StatisticsPlugin());

// Register AssetManager with custom cache size (10MB for testing)
framework.register(new AssetManagerPlugin({ cacheSize: 10485760 }));

framework.boot();

// Test AssetManager
console.log("");
console.log("Testing AssetManager...");
console.log("");

const assetManager = framework.assetManager;

// Register some test assets
assetManager
    .register("test-json", "package.json", "json")
    .register("test-json-2", "docs/PROJECT_MASTER.md", "json");

// List registered assets
console.log("Registered assets:");
assetManager.list().forEach(asset => {
    console.log(`  - ${asset.name} (${asset.type})`);
});

// Test sync loading
console.log("");
console.log("Loading JSON assets synchronously...");

try {
    const packageJson = assetManager.loader.loadSync("package.json", "json");
    console.log("✓ package.json loaded");
    console.log(`  Name: ${packageJson.name}`);
    console.log(`  Version: ${packageJson.version}`);
} catch (error) {
    console.log(`✗ Error: ${error.message}`);
}

// Test stats
console.log("");
console.log("AssetManager stats:");
const stats = assetManager.getStats();
console.log(`  Registered: ${stats.registered}`);
console.log(`  Loaded: ${stats.loaded}`);
console.log(`  Cache size: ${stats.cache.itemCount} items`);
console.log(`  Cache usage: ${stats.cache.percentUsed}%`);

console.log("");
console.log("Test completed!");

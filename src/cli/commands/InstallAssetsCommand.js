const TemplateEngine = require("../../template/TemplateEngine");
const fs = require('fs');
const path = require('path');

class InstallAssetsCommand {

    execute() {

        console.log("");
        console.log("Installing sample assets...");
        console.log("");

        const assetsDir = path.join("assets", "samples");

        // Create sample JSON manifest
        TemplateEngine.write(

            path.join(assetsDir, "manifest.json"),

JSON.stringify({
    "version": "1.0.0",
    "assets": {
        "images": [
            {
                "name": "placeholder-32x32",
                "file": "images/placeholder-32x32.png",
                "type": "image"
            }
        ],
        "audio": [
            {
                "name": "click-sound",
                "file": "audio/click.mp3",
                "type": "audio"
            }
        ],
        "sprites": [
            {
                "name": "character-idle",
                "file": "sprites/character-idle.png",
                "type": "sprite"
            }
        ]
    }
}, null, 2)

        );

        // Create sample sprite config
        TemplateEngine.write(

            path.join(assetsDir, "sprites.json"),

JSON.stringify({
    "character-idle": {
        "frames": 4,
        "frameWidth": 32,
        "frameHeight": 32,
        "speed": 0.1
    }
}, null, 2)

        );

        // Create placeholder PNG (1x1 transparent)
        const pngBuffer = Buffer.from([
            0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
            0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
            0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
            0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
            0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41,
            0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
            0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00,
            0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
            0x42, 0x60, 0x82
        ]);

        const imageDir = path.join(assetsDir, "images");
        fs.mkdirSync(imageDir, { recursive: true });
        fs.writeFileSync(path.join(imageDir, "placeholder-32x32.png"), pngBuffer);
        console.log("✓", path.join(imageDir, "placeholder-32x32.png"));

        // Create placeholder audio config
        const audioDir = path.join(assetsDir, "audio");
        TemplateEngine.write(
            path.join(audioDir, "click.json"),
            JSON.stringify({ type: "sound", duration: 0.1 }, null, 2)
        );

        // Create placeholder sprite
        const spriteDir = path.join(assetsDir, "sprites");
        fs.mkdirSync(spriteDir, { recursive: true });
        fs.writeFileSync(path.join(spriteDir, "character-idle.png"), pngBuffer);
        console.log("✓", path.join(spriteDir, "character-idle.png"));

        console.log("");
        console.log("Sample assets installed successfully!");
        console.log("");
        console.log("To use assets in your game:");
        console.log("");
        console.log('  assetManager.register("my-image", "assets/samples/images/placeholder-32x32.png", "image");');
        console.log('  await assetManager.preload("my-image");');
        console.log("");

    }

}

module.exports = InstallAssetsCommand;

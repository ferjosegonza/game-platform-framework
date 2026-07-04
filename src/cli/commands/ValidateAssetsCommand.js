const fs = require('fs');
const path = require('path');

class ValidateAssetsCommand {

    execute(args) {

        const assetsDir = args[0] || 'assets';

        console.log("");
        console.log(`Validating assets in: ${assetsDir}`);
        console.log("");

        if (!fs.existsSync(assetsDir)) {
            console.log(`✗ Directory not found: ${assetsDir}`);
            console.log("");
            return;
        }

        const results = {
            valid: [],
            missing: [],
            errors: []
        };

        // Check manifest
        const manifestPath = path.join(assetsDir, 'manifest.json');
        
        if (!fs.existsSync(manifestPath)) {
            console.log("⚠ No manifest.json found");
            console.log("");
            return;
        }

        try {

            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

            if (!manifest.assets) {
                results.errors.push("manifest.json: missing 'assets' key");
            } else {

                // Validate each asset
                for (const [category, assetList] of Object.entries(manifest.assets)) {

                    if (!Array.isArray(assetList)) {
                        results.errors.push(`Invalid category '${category}': must be an array`);
                        continue;
                    }

                    for (const asset of assetList) {

                        if (!asset.name || !asset.file) {
                            results.errors.push(`Missing name or file in ${category}`);
                            continue;
                        }

                        const assetPath = path.join(assetsDir, asset.file);

                        if (fs.existsSync(assetPath)) {
                            results.valid.push(`${asset.name} (${asset.type})`);
                        } else {
                            results.missing.push(`${asset.name} - ${assetPath}`);
                        }

                    }

                }

            }

        } catch (error) {

            results.errors.push(`Error parsing manifest.json: ${error.message}`);

        }

        // Print results
        console.log("✓ Valid assets:");
        results.valid.forEach(v => console.log(`  ✓ ${v}`));

        if (results.missing.length > 0) {
            console.log("");
            console.log("✗ Missing files:");
            results.missing.forEach(m => console.log(`  ✗ ${m}`));
        }

        if (results.errors.length > 0) {
            console.log("");
            console.log("⚠ Errors:");
            results.errors.forEach(e => console.log(`  ⚠ ${e}`));
        }

        console.log("");
        console.log(`Summary: ${results.valid.length} valid, ${results.missing.length} missing, ${results.errors.length} errors`);
        console.log("");

    }

}

module.exports = ValidateAssetsCommand;

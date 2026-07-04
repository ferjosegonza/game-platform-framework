const fs = require("fs");
const path = require("path");

class TemplateEngine {

    static ensureDir(dir) {
        fs.mkdirSync(dir, { recursive: true });
    }

    static write(file, content) {

        this.ensureDir(path.dirname(file));

        fs.writeFileSync(
            file,
            content,
            "utf8"
        );

        console.log("✓", file);

    }

}

module.exports = TemplateEngine;

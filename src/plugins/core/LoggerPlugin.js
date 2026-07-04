const Plugin = require("../Plugin");

class LoggerPlugin extends Plugin {

    getName() {
        return "Logger";
    }

    install(engine) {

        console.log("Installing Logger Plugin");

        engine.events.on("framework.started", () => {

            console.log("Framework started");

        });

    }

    start() {

        console.log("Logger started");

    }

}

module.exports = LoggerPlugin;

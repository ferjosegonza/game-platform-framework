const Plugin = require("../Plugin");

class StatisticsPlugin extends Plugin {

    install(engine) {

        engine.events.on("framework.started", () => {

            console.log("Statistics initialized");

        });

    }

}

module.exports = StatisticsPlugin;

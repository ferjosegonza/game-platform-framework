#!/bin/bash

echo ""
echo "======================================="
echo " Installing Step 06"
echo " Event Bus"
echo "======================================="
echo ""

mkdir -p src/events
mkdir -p src/plugins/core

########################################
# EventBus
########################################

cat > src/events/EventBus.js << 'EOT'
class EventBus {

    constructor() {

        this.listeners = new Map();

    }

    on(event, callback) {

        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event).push(callback);

    }

    emit(event, payload = {}) {

        if (!this.listeners.has(event)) {
            return;
        }

        for (const callback of this.listeners.get(event)) {
            callback(payload);
        }

    }

}

module.exports = EventBus;
EOT

########################################
# Framework
########################################

cat > src/core/Framework.js << 'EOT'
const PluginManager = require("../plugins/PluginManager");
const EventBus = require("../events/EventBus");

class Framework {

    constructor() {

        this.events = new EventBus();

        this.plugins = new PluginManager();

    }

    register(plugin) {

        this.plugins.register(plugin);

    }

    boot() {

        this.plugins.install(this);

        this.plugins.start(this);

        this.events.emit("framework.started");

    }

}

module.exports = Framework;
EOT

########################################
# LoggerPlugin
########################################

cat > src/plugins/core/LoggerPlugin.js << 'EOT'
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
EOT

########################################
# StatisticsPlugin
########################################

cat > src/plugins/core/StatisticsPlugin.js << 'EOT'
const Plugin = require("../Plugin");

class StatisticsPlugin extends Plugin {

    install(engine) {

        engine.events.on("framework.started", () => {

            console.log("Statistics initialized");

        });

    }

}

module.exports = StatisticsPlugin;
EOT

########################################
# test.js
########################################

cat > src/test.js << 'EOT'
const Framework = require("./core/Framework");

const LoggerPlugin = require("./plugins/core/LoggerPlugin");
const StatisticsPlugin = require("./plugins/core/StatisticsPlugin");

const framework = new Framework();

framework.register(new LoggerPlugin());

framework.register(new StatisticsPlugin());

framework.boot();
EOT

echo ""
echo "Step 06 installed."
echo ""

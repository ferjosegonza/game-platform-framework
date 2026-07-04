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

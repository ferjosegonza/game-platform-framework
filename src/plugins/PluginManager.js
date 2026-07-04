class PluginManager {

    constructor(){

        this.plugins = [];

    }

    register(plugin){

        this.plugins.push(plugin);

    }

    install(engine){

        for(const plugin of this.plugins){

            plugin.install(engine);

        }

    }

    start(engine){

        for(const plugin of this.plugins){

            plugin.start(engine);

        }

    }

    stop(engine){

        for(const plugin of this.plugins){

            plugin.stop(engine);

        }

    }

}

module.exports = PluginManager;
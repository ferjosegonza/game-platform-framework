class Plugin {

    constructor(config = {}) {

        this.config = config;

    }

    getName(){

        return "Plugin";

    }

    install(engine){

    }

    start(engine){

    }

    stop(engine){

    }

}

module.exports = Plugin;
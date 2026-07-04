const { createProject } = require("../../core/createProject");

class NewCommand {

    execute() {
        createProject();
    }

}

module.exports = NewCommand;
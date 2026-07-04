class CommandRegistry {

    constructor() {
        this.commands = new Map();
    }

    register(name, command) {
        this.commands.set(name, command);
    }

    execute(name, args) {

        const command = this.commands.get(name);

        if (!command) {
            console.log(`Unknown command: ${name}`);
            return;
        }

        command.execute(args);
    }

}

module.exports = CommandRegistry;
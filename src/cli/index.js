#!/usr/bin/env node

const CommandRegistry = require("./CommandRegistry");
const NewCommand = require("./commands/NewCommand");

const registry = new CommandRegistry();

registry.register("new", new NewCommand());

const command = process.argv[2];

if (!command) {

    console.log("");
    console.log("Game Platform Framework");
    console.log("");
    console.log("Commands:");
    console.log("");
    console.log("   new");
    console.log("");
    process.exit(0);

}

registry.execute(command, process.argv.slice(3));
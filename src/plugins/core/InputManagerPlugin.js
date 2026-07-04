const Plugin = require("../Plugin");
const InputManager = require("../../core/InputManager");
const MouseHandler = require("../../core/input/MouseHandler");
const KeyboardHandler = require("../../core/input/KeyboardHandler");
const TouchHandler = require("../../core/input/TouchHandler");

class InputManagerPlugin extends Plugin {

    constructor(config = {}) {

        super(config);
        this.inputManager = null;
        this.targetElement = config.element || null;

    }

    getName() {
        return "InputManager";
    }

    install(engine) {

        // Create input manager
        this.inputManager = new InputManager();

        // Store reference to engine events for handlers
        this.inputManager.handler = { events: engine.events };

        // Create and register handlers
        const mouseHandler = new MouseHandler(this.inputManager);
        const keyboardHandler = new KeyboardHandler(this.inputManager);
        const touchHandler = new TouchHandler(this.inputManager);

        this.inputManager
            .registerHandler("mouse", mouseHandler)
            .registerHandler("keyboard", keyboardHandler)
            .registerHandler("touch", touchHandler);

        // Register on framework
        engine.inputManager = this.inputManager;

        console.log("✓ InputManager installed");

    }

    start(engine) {

        // Get target element
        const element = this.targetElement || 
            (typeof document !== 'undefined' ? document : null);

        if (element) {
            this.inputManager.initialize(element);
        }

        // Listen for input management events
        engine.events.on("input.enable", () => {
            this.inputManager.enable();
        });

        engine.events.on("input.disable", () => {
            this.inputManager.disable();
        });

        console.log("✓ InputManager started");

    }

    stop(engine) {
        if (this.inputManager) {
            this.inputManager.destroy();
        }
        console.log("✓ InputManager stopped");
    }

}

module.exports = InputManagerPlugin;

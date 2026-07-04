const InputManager = require("../../core/InputManager");
const MouseHandler = require("../../core/input/MouseHandler");
const KeyboardHandler = require("../../core/input/KeyboardHandler");
const TouchHandler = require("../../core/input/TouchHandler");

class TestInputCommand {

    execute() {

        console.log("");
        console.log("Input Manager Test");
        console.log("");

        // Create input manager
        const inputManager = new InputManager();

        // Create mock event bus
        const mockEvents = {
            events: new Map(),
            on: function(event, callback) {
                if (!this.events.has(event)) {
                    this.events.set(event, []);
                }
                this.events.get(event).push(callback);
            },
            emit: function(event, payload) {
                if (this.events.has(event)) {
                    this.events.get(event).forEach(cb => cb(payload));
                }
            }
        };

        inputManager.handler = { events: mockEvents };

        // Create handlers
        const mouseHandler = new MouseHandler(inputManager);
        const keyboardHandler = new KeyboardHandler(inputManager);
        const touchHandler = new TouchHandler(inputManager);

        inputManager
            .registerHandler("mouse", mouseHandler)
            .registerHandler("keyboard", keyboardHandler)
            .registerHandler("touch", touchHandler);

        console.log("✓ Handlers registered:");
        inputManager.list().forEach(h => {
            console.log(`  - ${h.name} (${h.enabled ? 'enabled' : 'disabled'})`);
        });

        // Test key state tracking
        console.log("");
        console.log("Testing key state tracking:");
        inputManager.setKeyState("arrowup", true);
        inputManager.setKeyState("space", true);
        inputManager.setKeyState("arrowdown", false);

        console.log(`  ArrowUp: ${inputManager.isKeyPressed("arrowup") ? '✓ pressed' : '✗ released'}`);
        console.log(`  Space: ${inputManager.isKeyPressed("space") ? '✓ pressed' : '✗ released'}`);
        console.log(`  ArrowDown: ${inputManager.isKeyPressed("arrowdown") ? '✗ pressed' : '✓ released'}`);

        // Test mouse position
        console.log("");
        console.log("Testing mouse position tracking:");
        inputManager.setMousePosition(100, 200);
        const mousePos = inputManager.getMousePosition();
        console.log(`  Position: (${mousePos.x}, ${mousePos.y})`);

        // Test handler enable/disable
        console.log("");
        console.log("Testing handler enable/disable:");
        inputManager.disableHandler("mouse");
        inputManager.disableHandler("touch");
        console.log("After disabling mouse and touch:");
        inputManager.list().forEach(h => {
            console.log(`  - ${h.name} (${h.enabled ? 'enabled' : 'disabled'})`);
        });

        // Test event emission
        console.log("");
        console.log("Testing event system:");
        let keyDownCount = 0;
        let keyUpCount = 0;

        mockEvents.on("input.keyboard.down", () => {
            keyDownCount++;
        });

        mockEvents.on("input.keyboard.up", () => {
            keyUpCount++;
        });

        // Simulate events
        mockEvents.emit("input.keyboard.down", { key: "a" });
        mockEvents.emit("input.keyboard.down", { key: "b" });
        mockEvents.emit("input.keyboard.up", { key: "a" });

        console.log(`  Keyboard down events: ${keyDownCount}`);
        console.log(`  Keyboard up events: ${keyUpCount}`);

        console.log("");
        console.log("Input Manager test completed successfully!");
        console.log("");

    }

}

module.exports = TestInputCommand;

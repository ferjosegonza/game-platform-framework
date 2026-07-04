class InputManager {

    constructor() {

        this.handlers = new Map();
        this.isEnabled = true;
        this.keyStates = new Map(); // Track pressed keys
        this.mousePosition = { x: 0, y: 0 };

    }

    registerHandler(name, handler) {

        if (this.handlers.has(name)) {
            throw new Error(`Handler already registered: ${name}`);
        }

        this.handlers.set(name, {
            name,
            handler,
            enabled: true
        });

        return this;

    }

    getHandler(name) {

        const handlerEntry = this.handlers.get(name);
        return handlerEntry ? handlerEntry.handler : null;

    }

    enableHandler(name) {

        const entry = this.handlers.get(name);
        if (entry) {
            entry.enabled = true;
        }

        return this;

    }

    disableHandler(name) {

        const entry = this.handlers.get(name);
        if (entry) {
            entry.enabled = false;
        }

        return this;

    }

    enable() {
        this.isEnabled = true;
        return this;
    }

    disable() {
        this.isEnabled = false;
        return this;
    }

    isKeyPressed(key) {
        return this.keyStates.get(key) || false;
    }

    setKeyState(key, pressed) {
        this.keyStates.set(key, pressed);
    }

    getMousePosition() {
        return { ...this.mousePosition };
    }

    setMousePosition(x, y) {
        this.mousePosition = { x, y };
    }

    isHandlerEnabled(name) {

        const entry = this.handlers.get(name);
        return entry ? entry.enabled : false;

    }

    list() {

        const list = [];

        for (const [name, entry] of this.handlers) {
            list.push({
                name,
                enabled: entry.enabled
            });
        }

        return list;

    }

    initialize(element) {

        // Initialize all handlers
        for (const [name, entry] of this.handlers) {
            if (entry.handler.initialize) {
                entry.handler.initialize(element);
            }
        }

        return this;

    }

    destroy() {

        // Destroy all handlers
        for (const [name, entry] of this.handlers) {
            if (entry.handler.destroy) {
                entry.handler.destroy();
            }
        }

        this.handlers.clear();
        this.keyStates.clear();

        return this;

    }

}

module.exports = InputManager;

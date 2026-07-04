class KeyboardHandler {

    constructor(inputManager) {

        this.inputManager = inputManager;
        this.element = null;
        this.keyCodes = new Map();

    }

    initialize(element) {

        this.element = element || (typeof document !== 'undefined' ? document : null);

        if (!this.element) {
            console.warn('KeyboardHandler: No element available for initialization');
            return;
        }

        this.element.addEventListener('keydown', this._handleKeyDown.bind(this));
        this.element.addEventListener('keyup', this._handleKeyUp.bind(this));

    }

    _handleKeyDown(event) {

        if (!this.inputManager.isEnabled) return;

        const key = event.key.toLowerCase();
        const code = event.code;

        // Track key state
        this.inputManager.setKeyState(key, true);
        this.keyCodes.set(code, true);

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.keyboard.down', {
                key,
                code,
                keyCode: event.keyCode,
                ctrlKey: event.ctrlKey,
                shiftKey: event.shiftKey,
                altKey: event.altKey
            });
        }

    }

    _handleKeyUp(event) {

        if (!this.inputManager.isEnabled) return;

        const key = event.key.toLowerCase();
        const code = event.code;

        // Track key state
        this.inputManager.setKeyState(key, false);
        this.keyCodes.set(code, false);

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.keyboard.up', {
                key,
                code,
                keyCode: event.keyCode,
                ctrlKey: event.ctrlKey,
                shiftKey: event.shiftKey,
                altKey: event.altKey
            });
        }

    }

    isKeyDown(key) {
        return this.inputManager.isKeyPressed(key.toLowerCase());
    }

    destroy() {

        if (!this.element) return;

        this.element.removeEventListener('keydown', this._handleKeyDown.bind(this));
        this.element.removeEventListener('keyup', this._handleKeyUp.bind(this));

    }

}

module.exports = KeyboardHandler;

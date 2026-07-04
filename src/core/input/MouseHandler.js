class MouseHandler {

    constructor(inputManager) {

        this.inputManager = inputManager;
        this.element = null;
        this.isPressed = false;
        this.clickCount = 0;
        this.lastClickTime = 0;
        this.clickThreshold = 300; // ms for double click
        this.dragStartPos = null;
        this.isDragging = false;

    }

    initialize(element) {

        this.element = element || (typeof document !== 'undefined' ? document : null);

        if (!this.element) {
            console.warn('MouseHandler: No element available for initialization');
            return;
        }

        this.element.addEventListener('mousemove', this._handleMouseMove.bind(this));
        this.element.addEventListener('mousedown', this._handleMouseDown.bind(this));
        this.element.addEventListener('mouseup', this._handleMouseUp.bind(this));
        this.element.addEventListener('click', this._handleClick.bind(this));
        this.element.addEventListener('dblclick', this._handleDoubleClick.bind(this));

    }

    _handleMouseMove(event) {

        if (!this.inputManager.isEnabled) return;

        this.inputManager.setMousePosition(event.clientX, event.clientY);

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.mouse.move', {
                x: event.clientX,
                y: event.clientY
            });
        }

    }

    _handleMouseDown(event) {

        if (!this.inputManager.isEnabled) return;

        this.isPressed = true;
        this.dragStartPos = { x: event.clientX, y: event.clientY };

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.mouse.down', {
                x: event.clientX,
                y: event.clientY,
                button: event.button
            });
        }

    }

    _handleMouseUp(event) {

        if (!this.inputManager.isEnabled) return;

        this.isPressed = false;

        if (this.isDragging) {
            this.isDragging = false;
            
            if (this.inputManager.handler && this.inputManager.handler.events) {
                this.inputManager.handler.events.emit('input.mouse.dragend', {
                    x: event.clientX,
                    y: event.clientY
                });
            }
        }

        this.dragStartPos = null;

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.mouse.up', {
                x: event.clientX,
                y: event.clientY,
                button: event.button
            });
        }

    }

    _handleClick(event) {

        if (!this.inputManager.isEnabled) return;

        const now = Date.now();
        const timeDiff = now - this.lastClickTime;

        if (timeDiff < this.clickThreshold) {
            this.clickCount++;
        } else {
            this.clickCount = 1;
        }

        this.lastClickTime = now;

        // Check for drag
        if (this.dragStartPos) {
            const distance = Math.sqrt(
                Math.pow(event.clientX - this.dragStartPos.x, 2) +
                Math.pow(event.clientY - this.dragStartPos.y, 2)
            );

            if (distance > 10) {
                this.isDragging = true;
            }
        }

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.mouse.click', {
                x: event.clientX,
                y: event.clientY,
                button: event.button,
                clickCount: this.clickCount
            });
        }

    }

    _handleDoubleClick(event) {

        if (!this.inputManager.isEnabled) return;

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.mouse.dblclick', {
                x: event.clientX,
                y: event.clientY,
                button: event.button
            });
        }

    }

    destroy() {

        if (!this.element) return;

        this.element.removeEventListener('mousemove', this._handleMouseMove.bind(this));
        this.element.removeEventListener('mousedown', this._handleMouseDown.bind(this));
        this.element.removeEventListener('mouseup', this._handleMouseUp.bind(this));
        this.element.removeEventListener('click', this._handleClick.bind(this));
        this.element.removeEventListener('dblclick', this._handleDoubleClick.bind(this));

    }

}

module.exports = MouseHandler;

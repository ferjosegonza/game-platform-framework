class TouchHandler {

    constructor(inputManager) {

        this.inputManager = inputManager;
        this.element = null;
        this.activeTouches = new Map();
        this.tapThreshold = 200; // ms
        this.tapDistance = 10; // pixels
        this.swipeMinDistance = 50; // pixels

    }

    initialize(element) {

        this.element = element || (typeof document !== 'undefined' ? document : null);

        if (!this.element) {
            console.warn('TouchHandler: No element available for initialization');
            return;
        }

        this.element.addEventListener('touchstart', this._handleTouchStart.bind(this));
        this.element.addEventListener('touchmove', this._handleTouchMove.bind(this));
        this.element.addEventListener('touchend', this._handleTouchEnd.bind(this));
        this.element.addEventListener('touchcancel', this._handleTouchCancel.bind(this));

    }

    _handleTouchStart(event) {

        if (!this.inputManager.isEnabled) return;

        for (let i = 0; i < event.touches.length; i++) {
            const touch = event.touches[i];

            this.activeTouches.set(touch.identifier, {
                id: touch.identifier,
                startX: touch.clientX,
                startY: touch.clientY,
                currentX: touch.clientX,
                currentY: touch.clientY,
                startTime: Date.now()
            });
        }

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.touch.start', {
                touches: this.activeTouches.size,
                positions: Array.from(this.activeTouches.values()).map(t => ({
                    x: t.currentX,
                    y: t.currentY
                }))
            });
        }

    }

    _handleTouchMove(event) {

        if (!this.inputManager.isEnabled) return;

        for (let i = 0; i < event.touches.length; i++) {
            const touch = event.touches[i];
            const activeTouch = this.activeTouches.get(touch.identifier);

            if (activeTouch) {
                activeTouch.currentX = touch.clientX;
                activeTouch.currentY = touch.clientY;
            }
        }

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.touch.move', {
                touches: this.activeTouches.size,
                positions: Array.from(this.activeTouches.values()).map(t => ({
                    x: t.currentX,
                    y: t.currentY
                }))
            });
        }

    }

    _handleTouchEnd(event) {

        if (!this.inputManager.isEnabled) return;

        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            const activeTouch = this.activeTouches.get(touch.identifier);

            if (activeTouch) {
                const duration = Date.now() - activeTouch.startTime;
                const distance = Math.sqrt(
                    Math.pow(touch.clientX - activeTouch.startX, 2) +
                    Math.pow(touch.clientY - activeTouch.startY, 2)
                );

                // Detect tap
                if (duration < this.tapThreshold && distance < this.tapDistance) {
                    if (this.inputManager.handler && this.inputManager.handler.events) {
                        this.inputManager.handler.events.emit('input.touch.tap', {
                            x: touch.clientX,
                            y: touch.clientY
                        });
                    }
                }

                // Detect swipe
                if (distance > this.swipeMinDistance) {
                    const angle = Math.atan2(
                        touch.clientY - activeTouch.startY,
                        touch.clientX - activeTouch.startX
                    );

                    let direction = 'right';
                    if (angle > Math.PI * 0.75 || angle < -Math.PI * 0.75) {
                        direction = 'left';
                    } else if (angle > Math.PI * 0.25 && angle < Math.PI * 0.75) {
                        direction = 'down';
                    } else if (angle > -Math.PI * 0.75 && angle < -Math.PI * 0.25) {
                        direction = 'up';
                    }

                    if (this.inputManager.handler && this.inputManager.handler.events) {
                        this.inputManager.handler.events.emit('input.touch.swipe', {
                            direction,
                            distance,
                            duration
                        });
                    }
                }

                this.activeTouches.delete(touch.identifier);
            }
        }

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.touch.end', {
                remainingTouches: this.activeTouches.size
            });
        }

    }

    _handleTouchCancel(event) {

        if (!this.inputManager.isEnabled) return;

        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            this.activeTouches.delete(touch.identifier);
        }

        // Emit event
        if (this.inputManager.handler && this.inputManager.handler.events) {
            this.inputManager.handler.events.emit('input.touch.cancel', {
                remainingTouches: this.activeTouches.size
            });
        }

    }

    destroy() {

        if (!this.element) return;

        this.element.removeEventListener('touchstart', this._handleTouchStart.bind(this));
        this.element.removeEventListener('touchmove', this._handleTouchMove.bind(this));
        this.element.removeEventListener('touchend', this._handleTouchEnd.bind(this));
        this.element.removeEventListener('touchcancel', this._handleTouchCancel.bind(this));

    }

}

module.exports = TouchHandler;

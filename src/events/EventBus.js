class EventBus {

    constructor() {

        this.listeners = new Map();

    }

    on(event, callback) {

        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        this.listeners.get(event).push(callback);

    }

    emit(event, payload = {}) {

        if (!this.listeners.has(event)) {
            return;
        }

        for (const callback of this.listeners.get(event)) {
            callback(payload);
        }

    }

}

module.exports = EventBus;

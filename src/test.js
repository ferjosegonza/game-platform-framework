const Framework = require("./core/Framework");

const LoggerPlugin = require("./plugins/core/LoggerPlugin");
const StatisticsPlugin = require("./plugins/core/StatisticsPlugin");

const framework = new Framework();

framework.register(new LoggerPlugin());

framework.register(new StatisticsPlugin());

framework.boot();

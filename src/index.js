if (!process.env.NODE_ENV) process.exit(1); // Will not work in unknown environment

// Vendor modules
const Koa = require("koa");
const chalk = require("chalk");

// App instance
const app = new Koa();

// App starts
const listenTo = process.env.NODE_ENV === "test" ? 3030 : 3000;
// Exporting app for testing purposes
module.exports = {
    app: app.listen(listenTo),
};
console.log(
    chalk.blue(
        `\n--- Server running at :${listenTo} in environment "${
            process.env.NODE_ENV
        }"\n`,
    ),
);

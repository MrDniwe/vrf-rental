const gulp = require("gulp");
const moment = require("moment");
const color = require("cli-color");
const Promise = require("bluebird");
const server = require("gulp-develop-server");
const watch = require("gulp-watch");

const asyncServerListen = Promise.promisify(server.listen);
const asyncServerRestart = Promise.promisify(server.restart);

// Watching app files for developing purposes

// basic config
const config = {
    environment: "development",
    appExecucable: "./src/index.js",
    serverWatchPaths: ["./src/**/*.js"],
};

// helpers
const startServer = async () => {
    return await asyncServerListen({
        path: config.appExecucable,
        env: {
            NODE_ENV: config.environment,
        },
    });
};

const eventInformer = (vinyl, infostring) => {
    if (vinyl.event === "change") {
        console.log(nowtime(), color.yellow(`-- ${infostring} files changed`));
    }
    if (vinyl.event === "add") {
        console.log(nowtime(), color.green(`-- ${infostring} files added`));
    }
    if (vinyl.event === "unlink") {
        console.log(nowtime(), color.red(`-- ${infostring} files deleted`));
    }
};
const nowtime = () =>
    `[${color.blackBright(
        moment().format("DD.MM.YY - H:mm:ss.SS"),
    )}] ${color.cyan(__filename.replace(process.cwd() + "/", ""))} `;

const serverWatcher = async () =>
    new Promise((resolve, reject) =>
        watch(config.serverWatchPaths, async vinyl => {
            eventInformer(vinyl, "Server scripts: ");
            try {
                await asyncServerRestart();
                resolve();
            } catch (err) {
                reject(err);
            }
        }),
    );

gulp.task("default", () => {
    startServer()
        .then(() => {
            console.log(nowtime(), color.blue("Server start inited"));
            return Promise.resolve();
        })
        .then(() => {
            return serverWatcher();
        })
        .catch(err => {
            console.log(
                nowtime(),
                color.red("Error while working with task default:\n"),
                err,
            );
        });
});

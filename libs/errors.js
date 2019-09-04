// Tiny lib for working with errors

class CustomError extends Error {
    constructor(message, cause) {
        super(message);
        // we will store in contest all the significant additional data
        this.context = {};
        // and the possible error source as a "cause" to be wrapped
        if (cause instanceof Error) {
            this.cause = cause;
            this.stack = cause.stack;
        }
    }
    get context() {
        return this.context;
    }
    get cause() {
        return this.cause;
    }
    addContext(key, value) {
        this.context[key] = value;
    }
}

// The basic set of errors

class NotFoundError extends CustomError {
    constructor(message, cause) {
        super(message, cause);
        this.name = "NotFoundError";
    }
}

class BadRequestError extends CustomError {
    constructor(message, cause) {
        super(message, cause);
        this.name = "BadRequestError";
    }
}

class NotAuthorizedError extends CustomError {
    constructor(message, cause) {
        super(message, cause);
        this.name = "NotAuthorizedError";
    }
}

class ServerError extends CustomError {
    constructor(message, cause) {
        super(message, cause);
        this.name = "ServerError";
    }
}

class ForbiddenError extends CustomError {
    constructor(message, cause) {
        super(message, cause);
        this.name = "ForbiddenError";
    }
}

module.exports = {
    CustomError,
    NotFoundError,
    BadRequestError,
    NotAuthorizedError,
    ServerError,
    ForbiddenError,
};

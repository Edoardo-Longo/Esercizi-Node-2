import { ErrorRequestHandler, RequestHandler, Response } from "express";
import { STATUS_CODES } from "http";

interface HttpError extends Error{
    status?:  number;
    statusCode?: number;
}

function getErrorMessage(error: Error){
    if(error.stack){
        return error.stack;
    }

    if(typeof error.toString === "function"){
        return error.toString();
    }
    return "";
}

function isErrorStatusCode(statusCode: number){
    return statusCode >= 400 && statusCode < 600;
}

function getHttpStatusCode(error: HttpError, response: Response){
    const statusCodeFromError = error.status || error.statusCode;
    if(statusCodeFromError && isErrorStatusCode(statusCodeFromError)){
        return statusCodeFromError;
    }

    const statusCodeFromResponse = response.statusCode;
    if (isErrorStatusCode(statusCodeFromResponse)){
        return statusCodeFromResponse;
    }

    return 500;
}

export const notFoundMiddleware: RequestHandler = (
    request,
    response,
    next
) => {
    response.status(404);
    next(`Cannot ${request.method} ${request.path}`);
}

export function initErrorMiddleware(
    appEnvironment: string
): ErrorRequestHandler {
    return function errorMiddleware(err, req, res, next){
        const errorMessage = getErrorMessage(err);

        if (appEnvironment !== "test"){
            console.error(errorMessage);
        }

        if (res.headersSent){
            return next(err);
        }

        const statusCode = getHttpStatusCode(err, res);

        const errorResponse = {
            statusCode,
            err: STATUS_CODES[statusCode + ""],
            message: "",
        };

        if( appEnvironment !== "production"){
            err.message = errorMessage;
        }

        res.status(errorResponse.statusCode).json(errorResponse);

        next();
    };
}

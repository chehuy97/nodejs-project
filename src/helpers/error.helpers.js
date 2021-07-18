const httpStatus = require("http-status")

const response = (httpStatusCode, errorMessage, errorCode, data) => {
  return {
    httpStatusCode,
    errorMessage,
    errorCode,
    data
  };
};

    const SuccessResponse = (res, data, statusCode = 200) => {
    res.status(statusCode).json(response(statusCode, null, null, data));
  };
  
    const BadRequest = (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(response(httpStatus.BAD_REQUEST, serverError, errorCode, data));
  };
  
    const NoContent = (res, data, serverError = '', errorCode = 1) => {
    res
      .status(httpStatus.NO_CONTENT)
      .json(response(httpStatus.NO_CONTENT, serverError, errorCode, data));
  };
  
    const Unauthorized = (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json(response(httpStatus.UNAUTHORIZED, serverError, errorCode, data));
  };
  
    const Forbidden = (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.FORBIDDEN)
      .json(response(httpStatus.FORBIDDEN, serverError, errorCode, data));
  };
  
    const NotFound = (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.NOT_FOUND)
      .json(response(httpStatus.NOT_FOUND, serverError, errorCode, data));
  };
  
    const MethodNotAllowed = (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.METHOD_NOT_ALLOWED)
      .json(
        response(httpStatus.METHOD_NOT_ALLOWED, serverError, errorCode, data)
      );
  };
  
    const InternalServerError = (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json(
        response(httpStatus.INTERNAL_SERVER_ERROR, serverError, errorCode, data)
      );
  };
  
    const Conflict = (res, serverError = '', errorCode = 1, data = null) => {
    res
      .status(httpStatus.CONFLICT)
      .json(response(httpStatus.CONFLICT, serverError, errorCode, data));
  }

  module.exports = {
      response,
      SuccessResponse,
      BadRequest,
      NoContent,
      Unauthorized, 
      Forbidden,
      NotFound,
      MethodNotAllowed,
      InternalServerError,
      Conflict
  }
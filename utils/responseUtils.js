const constants = require('./constants');

const toResponse = (data = {}, message = '') => {
  if (data && data['meta']) {
    return {
      code: 200,
      message: message,
      meta: data.meta,
      data: data.data,
    }
  }
  return {
    code: 200,
    message: message,
    data,
  }
};


const toErrorResponse = (error) => {
  if (error.path && error.kind === 'ObjectId') return {...constants.errors.NOT_FOUND_OBJECT, data: undefined};
  if (error.code == '11000') {
    for (const key in error.keyPattern) {
      return {...constants.errors.OBJECT_EXISTED, message: `${key}.existed`, data: undefined};
    }
    return {...constants.errors.OBJECT_EXISTED, message: `object.existed`, data: undefined};
  }
  if (!isNaN(error.code)) return error;
  if (error.errors) {
    for (const key in error.errors) {
      const err = error.errors[key];
      switch (err.kind) {
        case 'required':
          return {...constants.errors.PARAM_REQUIRED, message: `${key}.required`, data: undefined};
        case 'enum':
          return {...constants.errors.PARAM_INVALID, message: `${key}.invalid`, data: undefined};
        case 'unique':
          return {...constants.errors.OBJECT_EXISTED, message: `${key}.existed`, data: undefined};
        case 'maxlength':
          return {...constants.errors.MAX_LENGTH, message: `${key}.maxLength`, data: undefined};
        case 'minlength':
          return {...constants.errors.MIN_LENGTH, message: `${key}.minLength`, data: undefined};
        case 'max':
          return {...constants.errors.MAX_NUMBER, message: `${key}.maxNumber`, data: undefined};
        case 'user defined':
          if (err.message === "invalid") return {...constants.errors.PARAM_INVALID, message: `${key}.invalid`};
          return {...constants.errors.PARAM_REQUIRED, message: `${key}.required`, data: undefined};
        case 'ObjectId':
          if (err.name === 'CastError') return {...constants.errors.NOT_FOUND_OBJECT, message: `${err.path}.not_found`};
          break;
      }
    }
    return error;
  }
  if (error.message && ['invalid signature', 'invalid token'].includes(error.message)) return {...constants.authErrors.PARAM_INVALID, message: `token.invalid`};
  if (error.message && error.message === 'jwt expired') return constants.authErrors.TOKEN_EXPIRED;
  if (error.name === "CastError") return  {...constants.errors.PARAM_INVALID, message: `${error.path}.invalid`};
  return {...constants.errors.SERVER_ERR, message: error.message, data: undefined};
};

module.exports = {
  toResponse,
  toErrorResponse,
};
const errors = {
  PARAM_REQUIRED: { code: 1000, message: 'param.required' },
  PARAM_INVALID: { code: 1001, message: 'param.invalid' },
  NOT_FOUND_OBJECT: { code: 1002, message: 'object.not_found' },
  OBJECT_USING: { code: 1003, message: 'object.using' },
  OBJECT_EXISTED: { code: 1004, message: 'object.existed' },
  ACCESS_DENY: { code: 1005, message: 'access.deny' },
  NOT_MATCH: { code: 1006, message: 'param.not_match' },
  MAX_LENGTH: { code: 1007, message: 'param.maxLength' },
  MIN_LENGTH: { code: 1008, message: 'param.minLength' },
  MAX_NUMBER: { code: 1009, message: 'param.maxNumber' },
  CODE_NOT_MATCH: { code: 1010, message: 'code.not_match' }
};

const authErrors = {
  PARAM_REQUIRED: { code: 3000, message: 'param.missing' },
  PARAM_INVALID: { code: 3001, message: 'param.invalid' },
  NOT_FOUND_OBJECT: { code: 3004, message: 'object.not_found' },
  AUTHENTICATE_FAILED: { code: 3005, message: 'authenticate.failed' },
  TOKEN_EXPIRED: { code: 3006, message: 'token.expired' },
};

const msgResponse = {
  LOGIN_SUCCESS: "login.success",
  REGISTER_SUCCESS: "register.success",
  LOGOUT_SUCCESS: "logout.success",
  CREATE_SUCCESS: "create.success",
  GET_ALL_SUCCESS: "getAll.success",
  GET_SUCCESS: "get.success",
  UPDATE_SUCCESS: "update.success",
  DELETE_SUCCESS: "delete.success",
  SEARCH_SUCCESS: "search.success",
  CHANGE_PASSWORD_SUCCESS: "changePassword.success",
  SEND_MAIL_SUCCESS: "sendMail.success",
  IMPORT_SUCCESS_AND_PROCESSING: "import.processing",
  EXPORT_SUCCESS: "export.success",
};

const serverErrors = {
  SERVER_ERR: { code: 5000, message: 'server.error' },
};

module.exports = {
  errors,
  msgResponse,
  authErrors,
  serverErrors,
};
/**
 * TABLE OF CONTENTS
 * exportParams         -- get parameters for request
 * normalizeParams      -- normalize parameters for request
 * isEmpty              -- check empty value
 * validateEmail        -- check format email
 * cleanObject          -- clean object have key contains "null" or "undefined"
 * cleanKeys            -- remove keys not necessary
 * stringInject         -- find and replace data by key
 * padWithZeroes        -- insert 0 in front of the string
 * generateString       -- generate any string
 * checkAddressMetaMask -- check wallet address of MetaMask

 * */

const {errors} = require('./constants');
const web3 = require('web3');

const exportParams = async (req) => {
  let query = {};
  let params = req.query;
  let page = 0;
  let size = 20;
  let fields = "";
  let sorts = undefined;
  if (params['page'] == 0 || params['page']) {
    page = isNaN(params['page']) ? page : +params['page'];
    delete params['page'];
  }
  if (params['size']) {
    size = isNaN(params['size']) ? size : +params['size'];
    delete params['size'];
  }
  if (params['fields']) {
    fields = params['fields'];
    delete params['fields'];
  }
  query = params;
  for (const key in query) {
    if (!query[key] && query[key] !== 0) delete query[key];
  }
  return {query, fields, page, size, sorts};
};

const normalizeParams = (query, fields, page, size, options) => {
  if (!fields) {
    fields = "-__v";
  } else {
    fields = fields.replace(',', ' ');
  }
  if (!query) {
    query = {};
  }
  for (const key in query) {
    if ((query[key] + '').trim().length === 0) {
      delete query[key];
    }
  }
  try {
    size = isNaN(size) ? 20 : +size;
  } catch (e) {
    size = 20;
  }
  try {
    page = isNaN(page) ? 0 : +page;
  } catch (e) {
    page = 0;
  }

  if (size > 0) {
    options.limit = size;
    options.skip = size * page;
  }
  return {query, fields, currentSize: size, currentPage: page};
};

const isEmpty = (data) => {
  if (typeof (data) === 'object') {
    if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
      return true;
    } else if (!data) {
      return true;
    }
    return false;
  } else if (typeof (data) === 'string') {
    return !data.trim();
  } else return typeof (data) === 'undefined';
};

const validateEmail = (elementValue) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
};

const cleanObject = (object) => {
  if (!object) {
    return {};
  }
  const result = {...object};
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if ([undefined, null].includes(value)) {
      delete result[key];
    }
  });
  return result;
};

const cleanKeys = (object, keys) => {
  if (!object) {
    return {};
  }
  const result = {...object};
  Object.keys(result).forEach((key) => {
    if (keys.includes(key)) {
      delete result[key];
    }
  });
  return result;
};

const stringInject = (str, data) => {
  if (typeof str === 'string' && (data instanceof Array)) {
    return str.replace(/({{\d}})/g, function (i) {
      return data[i.replace(/{{/, '').replace(/}}/, '')];
    });
  } else if (typeof str === 'string' && (data instanceof Object)) {
    if (Object.keys(data).length === 0) {
      return str;
    }
    for (let key in data) {
      return str.replace(/({{([^}]+)}})/g, function (i) {
        let key = i.replace(/{{/, '').replace(/}}/, '');
        if (!data[key]) {
          return i;
        }
        return data[key];
      });
    }
  } else if (typeof str === 'string' && !data instanceof Array || typeof str === 'string' && !data instanceof Object) {
    return str;
  } else {
    return false;
  }
};

const padWithZeroes = (number, length) => {
  let my_string = '' + number;
  while (my_string.length < length) {
    my_string = '0' + my_string;
  }
  return my_string;
};

const generateString = (length, {type = 1} = {}) => {
  const result = [];
  let characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (type === 2) characters = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join("");
};

const checkKeyInObject = (object, keys) => {
  for (const key of keys.split(" ")) {
    if (!object.hasOwnProperty(key)) throw {...errors.PARAM_REQUIRED, message: `${key}.required`}
  }
  return true;
};

const checkAddressMetaMask = (input) => {
  try {
    web3.utils.toChecksumAddress(input);
    return true;
  } catch(e) {
    return false;
  }
};

module.exports = {
  exportParams,
  normalizeParams,
  isEmpty,
  validateEmail,
  cleanObject,
  cleanKeys,
  stringInject,
  padWithZeroes,
  generateString,
  checkKeyInObject,
  checkAddressMetaMask,
};
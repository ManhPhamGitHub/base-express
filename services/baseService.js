const constants = require('../utils/constants');
const {isEmpty, normalizeParams} = require('../utils/utils');

class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(object) {
    try {
      object = await this.model.cleanKeys(object);
    } catch (error) {}
    return await this.model.create(object);
  }

  async queryCondition(query, {fieldSchemaCustom = []} = {}) {
    const fieldSchema = this.getFieldSchema(query);
    if (isEmpty(fieldSchemaCustom)) {
      fieldSchemaCustom = fieldSchema.keys_data;
    }
    if ("search" in query) {
      const querySearch = [];
      for (const field of fieldSchemaCustom) {
        querySearch.push({[field]: new RegExp(query.search.trim(), 'i')})
      }
      query.$or = querySearch;
      delete query["search"];
    }
    for (const i in fieldSchema.data) {
      query[i] = {$regex: `${query[i].trim()}`, $options: 'i'};
    }
    for (const i in fieldSchema.dataEnum) {
      query[i] = `${query[i].trim()}`;
    }
    return query;
  }

  getFieldSchema(body, {parentKeys = '', model = this.model} = {}) {
    const data = {};
    const keys_data = [];
    const dataEnum = [];
    const keys = Object.keys(model.schema.obj);
    keys.map(key => {
      if (body.hasOwnProperty(key) && model.schema.path(key).instance === 'String' && isEmpty(model.schema.path(key).enumValues)) {
        data[`${parentKeys}${key}`] = body[key];
      } else if (body.hasOwnProperty(key) && model.schema.path(key).instance === 'String' && model.schema.path(key).enumValues.length > 0) {
        dataEnum[`${parentKeys}${key}`] = body[key];
      }
    });
    keys.map(key => {
      if (model.schema.path(key).instance === 'String') {
        keys_data.push(`${parentKeys}${key}`);
      }
    });
    return {keys_data, data, dataEnum};
  }

  async getAll({query = {}, fields = "", page = 0, size = 20, sorts = undefined, populate = [], isCount = true, fieldSchemaCustom = [], isFull = false} = {}) {
    if (isFull) {
      size = -1;
    }
    const options = {sort: {'_id': -1}};
    if (sorts && typeof (sorts) === 'object') {
      options['sort'] = sorts;
    }
    const rs = normalizeParams(query, fields, page, size, options);
    if (Object.keys(rs.query).length !== 0) {
      rs.query = await this.queryCondition(rs.query, {fieldSchemaCustom});
    }
    const data = await this.model.find(rs.query, rs.fields, options).lean().populate(populate);
    if (!isCount) {
      return {data};
    }
    const count = await this.model.countDocuments(rs.query);
    const totalPage = size > 0 ? Math.ceil((count / size)) : 0;
    const meta = {count, size, totalPage, page};
    return {meta, data};
  }

  async get(query, populate = [], {fields = ""}) {
    const rs = await this.model.findOne(query, fields).populate(populate);
    if (!rs) {
      throw {...constants.errors.NOT_FOUND_OBJECT, desc: 'Cannot find'};
    }
    return rs;
  }

  async update(query, object, {select = ""}={}) {
    try {
      object = await this.model.cleanKeys(object);
    } catch (e) {}
    const rs = await this.model.findOneAndUpdate(query, object, {new: true, select, runValidators: true, context: 'query'});
    if (!rs) {
      throw {...constants.errors.NOT_FOUND_OBJECT, desc: 'Cannot update'};
    }
    return rs;
  }

  async delete(query) {
    const rs = await this.model.findOneAndRemove(query);
    if (!rs) {
      throw {...constants.errors.NOT_FOUND_OBJECT, desc: 'Cannot remove'};
    }
    return {};
  }
}

module.exports = BaseService;
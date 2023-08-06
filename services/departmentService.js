const BaseService = require('./baseService');
const Departent = require('../models/department');

class DepartmentService extends BaseService {
    constructor() {
        super(Departent);
    }

    async get() {
        try {
            const data = await Departent.find()
            return data
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new DepartmentService();
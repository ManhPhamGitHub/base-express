const BaseController = require('./baseController');
const departmentService = require('../services/departmentService');
const { toResponse } = require('../utils/responseUtils');

class DepartmentController extends BaseController {
    constructor() {
        super(departmentService);
    }
    async getDetail(req, res) {
        const data = await departmentService.get()
        return res.send(toResponse(data));
    }
}

module.exports = new DepartmentController();

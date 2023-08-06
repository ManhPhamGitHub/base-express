const express = require('express');
const router = express.Router();
const controller = require('../controllers/departmentController');
const auth = require('../middlewares/auth');

/* GET */
router.get('/', auth,
    (req, res) => {
        return controller.getDetail(req, res);
    });


// /* PUT */
// router.put('/:id', auth,
//     (req, res) => {
//         return controller.update(req, res);
//     });

// /* DELETE */
// router.delete('/:id', auth,
//     (req, res) => {
//         return controller.delete(req, res);
//     });

module.exports = router;

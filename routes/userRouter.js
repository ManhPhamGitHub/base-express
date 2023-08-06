const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const auth = require('../middlewares/auth');

/**
 * NOTE:
 * which routers have parameters, please put them below
 * */

/* POST */

router.post('/login',
  (req, res) => {
    return controller.login(req, res);
  });

router.post('/logout', auth,
  (req, res) => {
    return controller.logout(req, res);
  });

router.post('/logout-all', auth,
  (req, res) => {
    return controller.logoutAll(req, res);
  });

router.post('/sendMail',
  (req, res) => {
    return controller.sendMail(req, res);
  });

router.post('/:id',
  (req, res) => {
    return controller.create(req, res);
  });

/* GET */
router.get('/', auth,
  (req, res) => {
    return controller.getAll(req, res);
  });

router.get('/:id', auth,
  (req, res) => {
    return controller.get(req, res);
  });

/* PUT */
router.put('/:id', auth,
  (req, res) => {
    return controller.update(req, res);
  });

/* DELETE */
router.delete('/:id', auth,
  (req, res) => {
    return controller.delete(req, res);
  });

module.exports = router;

const router = require('express').Router();
const { create, deleteT, update, getAll, getAllThings } = require('../controllers/ThingsController');

router.get("/", getAll);
router.get("/all", getAllThings);
router.post('/create', create);
router.delete('/delete', deleteT);
router.post('/updateproduct', update);

module.exports = router;
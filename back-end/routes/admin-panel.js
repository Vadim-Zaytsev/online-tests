const {Router} = require('express');
const isAdmin = require('../middleware/isAdmin');
const adminPanelController = require('../controllers/admin-panel/admin-panel');
const isAuth = require('../middleware/isAuth');
const router = Router();

router.get('/', isAuth, isAdmin, adminPanelController.renderIndexPage);

router.get('/safe-handling-of-weapons/questions', isAuth, isAdmin, adminPanelController.renderQuestionPage);

router.get('/safe-handling-of-weapons/tickets', isAuth, isAdmin, adminPanelController.renderTicketsPage);

router.get('/safe-handling-of-weapons/create-question', isAuth, isAdmin, adminPanelController.renderCreateQuestionPage);

router.post('/safe-handling-of-weapons/create-question', isAuth, isAdmin, adminPanelController.createQuestion)

module.exports = router;




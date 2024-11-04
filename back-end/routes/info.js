const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Информация о приложении',
        isInfo: true,
    });
});

module.exports = router;
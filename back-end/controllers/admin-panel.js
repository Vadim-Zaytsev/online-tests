class adminPanelController {
    async renderPage(req, res) {
        try {
            res.render('admin-panel', {
                title: 'Панель администратора',
                isAdminPanel: true,
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new adminPanelController();
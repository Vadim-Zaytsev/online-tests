document.addEventListener('DOMContentLoaded', function() {

    // Инициализация выпадающего меню (бургер меню)
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));

    // Инициализация вкладок
    M.Tabs.init(document.querySelectorAll('.tabs'));

    // Инициализация collapsible
    M.Collapsible.init(document.querySelectorAll('.collapsible'));

    // Инициализация select
    M.FormSelect.init(document.querySelectorAll('select'));
});

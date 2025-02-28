const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Путь к файлу, где будут храниться данные о просмотрах
const viewsFilePath = path.join(__dirname, 'views.json');

// Функция для чтения данных из файла
function readViewsFromFile() {
    try {
        const data = fs.readFileSync(viewsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Если файла нет, возвращаем пустой объект
        return {};
    }
}

// Функция для записи данных в файл
function writeViewsToFile(views) {
    fs.writeFileSync(viewsFilePath, JSON.stringify(views, null, 2), 'utf8');
}

// Обработчик для корневой страницы "/"
app.get('/', (req, res) => {
    const views = readViewsFromFile();
    views['/'] = (views['/'] || 0) + 1;
    writeViewsToFile(views);

    res.send(`
        <h1>Корневая страница</h1>
        <p>Просмотров: ${views['/']}</p>
        <a href="/about">Ссылка на страницу /about</a>
    `);
});

// Обработчик для страницы "/about"
app.get('/about', (req, res) => {
    const views = readViewsFromFile();
    views['/about'] = (views['/about'] || 0) + 1;
    writeViewsToFile(views);

    res.send(`
        <h1>Страница about</h1>
        <p>Просмотров: ${views['/about']}</p>
        <a href="/">Ссылка на страницу /</a>
    `);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
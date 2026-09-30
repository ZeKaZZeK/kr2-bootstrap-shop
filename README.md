# kr2-bootstrap-shop — магазин гаджетов «ТехНест»

## Контрольная работа №2
Тема: «CSS-фреймворки: разработка интерфейса на Bootstrap или альтернативном CSS-фреймворке».
Дисциплина: «Фронтенд и бэкенд разработка», 3 семестр, 2026/2027 уч. год.

**Студент:** ФИО, группа _(заполнить)_
**Ссылка на GitHub Pages:** https://zekazzek.github.io/kr2-bootstrap-shop/

## Описание
Сайт интернет-магазина гаджетов: главная, каталог с фильтром, страница товара, форма заказа и контакты.
Это отдельная реализация на Bootstrap, а не адаптация КР №1.

## Используемый фреймворк
Bootstrap 5.3.8.

## Способ подключения
**CDN** (jsDelivr). `css/custom.css` подключается после `bootstrap.min.css`, чтобы переопределять стили. JS Bundle подключён в конце `body` (нужен для меню, модального окна, accordion, tabs, carousel, toast).

Перейти на локальное подключение: скачать compiled-версию Bootstrap, положить файлы в `vendor/bootstrap/css/bootstrap.min.css` и `vendor/bootstrap/js/bootstrap.bundle.min.js`, заменить ссылки в `<head>` и перед `</body>` на `vendor/bootstrap/...`, после чего изменить этот раздел README.

## Структура проекта
```
kr2-bootstrap-shop/
├── index.html      главная: navbar, hero + carousel, преимущества, популярные товары, accordion
├── catalog.html    каталог: сетка карточек, фильтр, поиск, пагинация
├── product.html    товар (по ?id=): описание, цена, badge, tabs
├── order.html      форма заявки
├── contacts.html   контакты (доп. страница)
├── css/custom.css  собственные стили поверх Bootstrap
├── js/products.js  данные о товарах
├── js/app.js       корзина, фильтры, формы, toast
├── images/         изображения товаров (SVG)
├── README.md
└── .gitignore
```

## Реализованные компоненты Bootstrap
`container`, `row`, `col-*`, `g-*`, `navbar`, `card`, `btn`, `badge`, `alert`, `modal`, `form-control`, `form-select`, `input-group`, `form-check`, `accordion`, `carousel`, `tabs`, `pagination`, `toast`, `breadcrumb`, `table`.

## Самостоятельные доработки
- Дополнительная страница `contacts.html`.
- Каталог: фильтр по категориям, поиск, пагинация (JS).
- Страница товара наполняется из `products.js` по `?id=`; кнопка «Оформить заказ» подставляет товар в форму.
- Счётчик корзины в navbar (localStorage) и toast при добавлении.
- Валидация форм Bootstrap, сообщение alert после отправки.
- Модальное окно быстрой заявки на всех страницах.
- Фирменные цвета и кнопка `btn-brand` в `custom.css`, учёт `prefers-reduced-motion`.

## Как проверить
1. Открыть `index.html` в браузере (нужен интернет для CDN).
2. DevTools → Toggle device toolbar: проверить ширины 360, 768, 1200 px — карточки перестраиваются, меню сворачивается.
3. Каталог: переключить категорию, ввести запрос, нажать «В корзину» (счётчик растёт, появляется toast).
4. Кнопка «Заказать звонок» открывает модальное окно; пустая форма показывает ошибки.
5. Отправить форму на `order.html` — появляется alert об успехе.

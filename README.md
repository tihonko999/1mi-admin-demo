# Система Администрирования Demo

Репозиторий содержит отдельные упрощенные фрагменты кода проекта https://newizv.ru/admin

### Технологический стэк

- Node v16
- Yarn (Classic)
- TypeScript
- VueJS
- VueJSX
- Vuex
- ESLint
- Prettier
- TailwindCSS
- PostCSS
- SCSS
- CSS Modules
- Docker
- Gitlab CI/CD

### Инициализация

- yarn install

### Особенности

- Vue код организован внутри `.tsx` файлов что обеспечивает более полную типизацию и лучшую поддержку IDE относительно `.vue` файлов
- Композитная функция для подгрузки элементов техникой Infinity Scroll: `src/helpers/useInfScroll.ts`
- Авторизация пользователя перед монтированием приложения: `src/main.ts`

# Проект Diploma  бэкенд

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Можно обратиться по домену
метод get  https://slt116.nomoredomains.club//users/me - вернет всех пользователей
метод patch  https://slt116.nomoredomains.club/users/me - заменит данные юзера

метод get  https://slt116.nomoredomains.club/movies - вернет всех  видео
метод post  https://slt116.nomoredomains.club/movies - добавить видео
метод delete  https://slt116.nomoredomains.club/movies/:moviesId - удалить  видео

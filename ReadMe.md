Пример ToDo на Redux Slice. В проекте есть регистрация пользователя, изменение его персональных данных. Создание ToDo по Crud. Все записывается в БД. 

На client запускаем npm i && npm run dev
На server запускаем npm i && npm run server

Запускаем Docker 
sudo chmod 666 /var/run/docker.sock - временно для всех пользователей 
docker compose up -d
cd server
npm run db
или через MakeFile
make reset //  drop → create → migrate → seed


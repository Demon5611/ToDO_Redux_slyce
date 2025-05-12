#!/bin/bash

ENV=${1:-development}

echo "📦 Sequelize DB manager (env: $ENV)"
echo "=============================="
echo "1. Create database"
echo "2. Drop database"
echo "3. Run migrations"
echo "4. Undo all migrations"
echo "5. Seed data"
echo "6. Undo all seeds"
echo "7. Reset (drop → create → migrate → seed)"
echo "8. Reseed (undo seeds → seed again)"
echo "9. Exit"
echo "------------------------------"

read -p "Выберите действие [1-9]: " choice

run() {
  echo "▶️ Выполняем: $1"
  eval "$1"
}

case $choice in
  1)
    run "npx sequelize db:create --env $ENV"
    ;;
  2)
    run "npx sequelize db:drop --env $ENV"
    ;;
  3)
    run "npx sequelize db:migrate --env $ENV"
    ;;
  4)
    run "npx sequelize db:migrate:undo:all --env $ENV"
    ;;
  5)
    run "npx sequelize db:seed:all --env $ENV"
    ;;
  6)
    run "npx sequelize db:seed:undo:all --env $ENV"
    ;;
  7)
    run "npx sequelize db:drop --env $ENV && npx sequelize db:create --env $ENV && npx sequelize db:migrate --env $ENV && npx sequelize db:seed:all --env $ENV"
    ;;
  8)
    run "npx sequelize db:seed:undo:all --env $ENV && npx sequelize db:seed:all --env $ENV"
    ;;
  9)
    echo "👋 Выход"
    exit 0
    ;;
  *)
    echo "❌ Неверный выбор"
    ;;
esac

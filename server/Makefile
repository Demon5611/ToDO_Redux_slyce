# Настройки по умолчанию
DB_ENV ?= development

# Команды
migrate:
	npx sequelize db:migrate --env $(DB_ENV)

undo:
	npx sequelize db:migrate:undo:all --env $(DB_ENV)

seed:
	npx sequelize db:seed:all --env $(DB_ENV)

unseed:
	npx sequelize db:seed:undo:all --env $(DB_ENV)

create-db:
	npx sequelize db:create --env $(DB_ENV)

drop-db:
	npx sequelize db:drop --env $(DB_ENV)

reset:
	npx sequelize db:drop --env $(DB_ENV) && npx sequelize db:create --env $(DB_ENV) && npx sequelize db:migrate --env $(DB_ENV) && npx sequelize db:seed:all --env $(DB_ENV)

reseed:
	npx sequelize db:seed:undo:all --env $(DB_ENV) && npx sequelize db:seed:all --env $(DB_ENV)


# make migrate      # Применить миграции
# make undo         # Откатить все миграции
# make seed         # Загрузить сиды
# make unseed       # Откатить сиды
# make reset        # Полный сброс и сидинг (drop → create → migrate → seed)
# make reseed       # Пересидинг (удалить и применить сиды)x`x``
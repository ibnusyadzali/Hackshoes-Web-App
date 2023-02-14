# Hackshoes-Web-App
still runing on local host

# please run on server for setting up database:
npm i
npx sequelize-cli db:create
npx sequelize db:migrate
npx sequelize-cli db:seed:all

add .env file and copy jwt key:
JWT_KEY=enigma

# admin account:
email: ibnu@mail.com
pass : 666666

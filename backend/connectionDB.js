import Sequelize from 'sequelize';

const dbName = "prog_internet";
const dbUser = "root";
const dbHost = "localhost";
const dbPassword = "password";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  //passar os dados para o sequelize
  dialect: "mysql", //informar o tipo de banco que vamos utilizar
  host: dbHost, //o host, neste caso estamos com um banco local
});

export default sequelize; //exportar
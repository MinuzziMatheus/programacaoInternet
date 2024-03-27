module.exports = (sequelize, Sequelize) => {
   const Client = sequelize.define("client", {
     name: {
       type: Sequelize.STRING
     },
     email: {
      type: Sequelize.STRING
     },
     password: {
      type: Sequelize.STRING
     },
     documentation: {
       type: Sequelize.STRING
     },
     phone: {
       type: Sequelize.STRING
     }
   });
 
   return Client;
 };
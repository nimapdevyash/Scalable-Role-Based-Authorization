const {Sequelize} = require("sequelize")

const sequelize = new Sequelize({
  port : process.env.DB_PORT,
  password : process.env.DB_PASS,
  username : "postgres" ,
  host : "localhost",
  dialect : "postgres"
});

let retryCount = 0 ;

async function connectToDB() {
  try {
    await sequelize.authenticate() ;
    retryCount = 0 ;
    console.log("connected to DB successfully")
  } catch (error) {
    console.log(`retrying after ${retryCount} seconds`);
    setTimeout(connectToDB , retryCount * 1000)
  }
}

module.exports = {
  sequelize ,
  connectToDB
}
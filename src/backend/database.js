const { Sequelize, DataTypes, SyncOptions } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

const initDB = async () => {
  sequelize.authenticate();
  console.log(`Database created`);
  await sequelize.sync({ force: false, logging: false });
  console.log("All models were synchronized successfully.");
};

module.exports = { initDB, User };

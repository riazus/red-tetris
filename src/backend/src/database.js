import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

const Leaderboard = sequelize.define("Leaderboard", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
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

export { initDB, Leaderboard };

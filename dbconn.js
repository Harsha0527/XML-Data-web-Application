const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nsfawards", "root", "ck@123", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    timestamps: false
  }

});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;

import sequelize from "./db";
import server from "./server";

const PORT = 3001;
server.listen(PORT, async () => {
  console.log("Lolis")
  await sequelize.authenticate();
  console.log("autenticado")
  await sequelize.sync();
  console.log("DB created")
  console.log(`server listening at port: ${PORT}`)
})

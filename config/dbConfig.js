//For local environment 

// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "",
//     DB: "finance",
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   };

//For Production
module.exports = {
  HOST: "roundhouse.proxy.rlwy.net",
  USER: "root",
  PASSWORD: "C5dbec5EFGg34AFHg31HbHc44H1H6Cg1",
  DB: "railway",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
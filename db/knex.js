const environment = "development";
const config = require("../knexfile.js")[environment];
const knex = require("knex")(config);

module.exports = knex;

// Update with your config settings.

// module.exports = {

//     development: {
//       client: "mysql",
//       connection: {
//         database: "todo_app",
//         user: "root",
//         password: "[事前準備で設定したrootユーザのパスワード]",
//       },
//       pool: {
//         min: 2,
//         max: 10
//       },
//     },
  
//     staging: {
//       client: "mysql",
//       connection: {
//         database: "todo_app",
//         user: "root",
//         password: "[事前準備で設定したrootユーザのパスワード]",
//       },
//       pool: {
//         min: 2,
//         max: 10
//       },
//     },
  
//     production: {
//       client: "mysql",
//       connection: {
//         database: "todo_app",
//         user: "root",
//         password: "[事前準備で設定したrootユーザのパスワード]",
//       },
//       pool: {
//         min: 2,
//         max: 10
//       },
//     }
  
//   };
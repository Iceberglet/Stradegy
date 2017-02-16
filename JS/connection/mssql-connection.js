var sql = require('mssql')

// sql.connect("mssql://sa:sadmin@localhost:1433/MIN_EXPERIMENT").then(function() {
//     // Query
//     new sql.Request().query('SELECT TOP 100 * from BASE_QUOTE').then(function(recordset) {
//         console.log(recordset);
//     }).catch(function(err) {
//         // ... query error checks
//     });
//     // Stored Procedure
//     new sql.Request()
//     .input('input_parameter', sql.Int, value)
//     .output('output_parameter', sql.VarChar(50))
//     .execute('procedure_name').then(function(recordsets) {
//         console.dir(recordsets);
//     }).catch(function(err) {
//         // ... execute error checks
//     });
//     // ES6 Tagged template literals (experimental)
//     sql.query`SELECT TOP 100 * from BASE_QUOTE WHERE ID = 1052064000000`.then(function(recordset) {
//         console.log(recordset);
//     }).catch(function(err) {
//         // ... query error checks
//     });
// }).catch(function(err) {
//     // ... connect error checks
// });

const querySQL = (str)=>{
  return sql.connect("mssql://sa:sadmin@localhost:1433/MIN_EXPERIMENT").then(function() {
      return new sql.Request().query(str).then(function(recordset) {
        console.log(recordset);
      }).catch(function(err) {
        console.error(err)
      });
  }).catch(function(err) {
      console.error(err)
  });
}

function createConnection(){
  return {
    saveStrategy: function(name, js_content, js_var_content){
      let query = `INSERT INTO STRATEGY ([ID], [JAVASCRIPT], [JAVASCRIPT_VAR]) VALUES ("${name}", "${js_content}", "${js_var_content}");`
      console.log(query)
      return querySQL(query)
    },
    updateStrategy: function(name, js_content, js_var_content){
      let query = `UPDATE STRATEGY SET JAVASCRIPT="${js_content}", JAVASCRIPT_VAR="${js_var_content}" WHERE ID="${name}";`
      console.log(query)
      return querySQL(query)
    }
  }
}

var exports = module.exports = createConnection()

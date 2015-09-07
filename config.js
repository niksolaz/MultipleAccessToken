//saved info secret and database in bash
var Database = process.env.DATABASE_MODULUS;
var Secret = process.env.SECRET_MODULUS;
//export file
module.exports = {

    'secret': Secret,
    'database': Database

};
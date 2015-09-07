var Database = process.env.DATABASE_MODULUS;
var Secret = process.env.SECRET_MODULUS;
console.log('This is database: '+Database);
console.log('This is secret: '+Secret);
console.log(process.env.DATABASE_MODULUS);
console.log(process.env.SECRET_MODULUS);


module.exports = {

    'secret': Secret,
    'database': Database

};
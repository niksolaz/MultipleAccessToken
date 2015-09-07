var Database = JSON.stringify(process.env.DATABASE);
var Secret = process.env.SECRET;
console.log('This is database: '+Database);
console.log('This is secret: '+Secret);
console.log(process.env.DATABASE);
console.log(process.env.SECRET);


module.exports = {

    'secret': Secret,
    'database': Database

};
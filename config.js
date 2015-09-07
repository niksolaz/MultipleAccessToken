var Database = JSON.stringify(process.env.DATABASE);
var Secret = JSON.stringify(process.env.SECRET);
console.log('This is database: '+Database);
console.log('This is secret: '+Secret);

module.exports = {

    'secret': Secret,
    'database': Database

};
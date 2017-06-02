# readdb
Get your database metadata info

readdb is a package to get database metadata such as tables, fields, foreign and primary keys.

### install

On your console, run
```console
npm install readdb --save
```

### usage
First, you may require the readdb package

```javascript
const readdb = require( 'readdb');
```

Then, instantiate a new readdb object and connect to your database usign the credentials like this

```javascript
new readdb( 'database', 'user', 'password' )
```

To finally use the readdb class, you need to call the method setup. This method returns a promise with the configured readdb object

```javascript
readdb.setup().then( readdb => {
    
    // now you con navigate through your database
    readdb.onTables( table => {
        
        // look, a table that i found
        console.log( table.name );
    });
})
.catch( err => {
    
    // something went wrong ......
    console.log( err );
});
```

Check the full exemple code
```javascript
const readdb = require( 'readdb');

new readdb( 'database', 'user', 'password' ).setup().then( readdb => {
    
    // now you con navigate through your database
    readdb.onTables( table => {
        
        // look, a table that i found
        console.log( table.name );
    });
})
.catch( err => {
    
    // something went wrong ......
    console.log( err );
});
```

## Reference

### readb class
`setup()` set the database mapping
`onTables( callback )` executes a function for each table found on database
`table()` gets a specific table of the database

### table class
`name: string` name of the table
`onFields( callaback )` execute a function for each field of the table
`onForeignKeys( callback )` execute a function for each foreign key of the table
`onPrimaryKeys( callback )` execute a function for each primary key of the table

### field class
`name: string` name of the field
`type: string` the type of the field
`size: number` the size of the field
`allowNull: boolean` if the field allows null values
`defaultValue: string` the default value for this field
`primaryKey: boolean` if a field is a primary key or not

## Instance options

When you instantiate a new readdb class, it accepts four params. They are:
`database: string` the database name
`user: string` the database user
`password: string` the password
`option: object` and object with some configuration.
The fourth param, options, acceppts this properties
```javascript
var db = new readdb('database', 'user', 'pass', {
    host: 'localhost',
    dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
    directory: false, // prevents the program from writing to disk
    port: 'port',
    additional: {
        timestamps: false
        //...
    },
    tables: ['table1', 'table2', 'table3']
    //...
})
```

### Adapters

Readdb works with mysql as default, but it can run with mariadb, sqlite, postgres and mssql as well. To do this, you need install it's respective npm package.

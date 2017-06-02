const Field = require( './field' );

/**
 * Table
 * 
 * the table class
 */
class Table {

    /**
     * constructor
     * 
     * the constructor method
     */
    constructor( tblName, tblObject ) {

        // seta o objeto da tabela
        this.tblObject = tblObject.tables[tblName];

        // seta as chaves estrangeiras
        this.fks = [];

        // seta o nome
        this.name = tblName;

        // seta o array de campos
        this.fields = [];

        // seta os campos
        this.parseFields();
    }

    /**
     * _getFieldNames
     * 
     * get the name of the fields
     */
     _getFieldNames() {

        // variavel de retorna
        const ret = [];

        // percorre todos os campos da tabela
        for ( let t in this.tblObject ) {
            ret.push( t );
        }

        // retorna os campos
        return ret;
    }

    /**
     * field
     * 
     * get the field instance
     */
    field( name ) {

        // percorre todas as tabelas
        for ( let f in this.fields ) {

            // verifica se é a tabela pesquisa
            if ( name == this.fields[f].name ) {
                return this.fields[f];
            }
        }

        // exibe o erro
        throw new Error( 'O campo '+name+' não existe na tabela '+this.name );
    }

    /**
     * onFields
     * 
     * execute a callback for each table's field
     */
    onFields( callback ) {

        // para cada tabela
        for( let f in this.fields ) {

            // usa o callback
            callback( this.fields[f]);
        }
    }

    /**
     * parseFields
     * 
     * setup the fields
     */
    parseFields() {

        // pega o nome dos campos
        const fields = this._getFieldNames();

        // percorre todos os campos
        for ( const f in fields ) {

            // seta os campos
            this.fields.push( new Field( fields[f], this ) );
        }
    }

    /**
     * hasForeaingKey
     * 
     * check if this table has foreign keys
     */
    hasForeignKey() {

        // verifica se existe alguma foreign key
        return this.fks.length > 0 ? true : false;
    }

    /**
     * onForeignKeys
     * 
     * execute a callback for each foreign key
     * 
     * @param {*} callback 
     */
    onForeignKeys( callback ) {

        // para cada foreign key
        for ( let f in this.fks ) {

            // executa o callback
            callback( this.fks[f] );
        }
    }

    /**
     * getForeignKeys
     * 
     * get all foreign keys
     */
    getForeignKeys() {

        // retorna as chaves estrangeiras
        return this.fks;
    }

    /**
     * onPrimaryKeys
     * 
     * get all primary keys
     */
    onPrimaryKeys( callback ) {
        
        // pega as chaves primarias
        const keys = this.getPrimaryKeys();

        // percorre todas as chaves
        for ( let k in keys ) {

            // executa o callback
            callback( keys[k] );
        }
    }

    /**
     * getPrimaryKeys
     * 
     * get all primary keys
     */
    getPrimaryKeys() {

        // array de retorno
        const ret = [];

        // percorre todos os campos
        for ( let f in this.fields ) {

            // verifica se é uma chave primaria
            if ( this.fields[f].primaryKey )
                ret.push( this.fields[f] );
        }

        // volta o array
        return ret;
    }
}

module.exports = Table;

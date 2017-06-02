const SequelizeAuto = require( 'sequelize-auto' );
const Table = require( './classes/table' );
const FK = require( './classes/fk' );
class Readdb {
    
    constructor( database, user, pass, opt = {} ) {
        
        // array com as tabelas
        this.tables = [];

        // seta o sequelize auto
        this.auto = new SequelizeAuto( database, user, pass, opt );
    }

    setup() {
        
        // retorna uma promessa
        return new Promise( ( resolve, reject ) => {

            // verifica se o sequelize auto foi setado
            if ( !this.auto ) reject( false );

            // chama o método
            this.auto.build( ( err ) => {

                // verifica se existe algum erro
                if ( err ) reject( err );

                // seta os atributos da classe
                this.serialize();

                // volta true
                resolve( this );
            });
        });
    }

    serialize() {

        // percorre as tabelas
        for ( let i in this.auto.tables ){

            // adiciona o objeto no atributo tables
            this.tables.push( new Table( i, this.auto ) );
        }

        // percorre as chaves estrangeiras
        for ( let f in this.auto.foreignKeys ) {
            
            // percorre as chaves
            for ( let i in this.auto.foreignKeys[f] ) {

                // seta a chave
                const chave = this.auto.foreignKeys[f][i];

                // verifica se é uma chave estrangeira
                if ( chave.isForeignKey ) {

                    // cria uma nova chave
                    const fk = new FK();
                    fk.sourceTable = this.table( f );
                    fk.sourceField = this.table( f ).field( chave.source_column );
                    fk.targetTable = this.table( chave.target_table );
                    fk.targetField = this.table( chave.target_table ).field( chave.target_column );

                    // adiciona a chave estrangeira na tabela
                    this.table( f ).fks.push( fk );
                }
            }
        }
    }

    table( name ) {

        // percorre todas as tabelas
        for ( let t in this.tables ) {

            // verifica se é a tabela pesquisa
            if ( name == this.tables[t].name ) {
                return this.tables[t];
            }
        }

        // exibe o erro
        throw new Error( 'A tabela '+name+' não existe' );
    }

    onTables( callback ) {

        // para cada tabela
        for( let t in this.tables ) {

            // usa o callback
            callback( this.tables[t]);
        }
    }
}

module.exports = Readdb;
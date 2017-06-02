/**
 * Field
 * 
 * the field class
 */
class Field {

    /**
     * constructor
     * 
     * the constructor method
     */
    constructor( name, table ) {

        // seta o campo
        this.name = name;

        // seta a tabela
        this.table = table;

        // seta o tipo 
        this.type = null,
        
        // seta se permite nulo
        this.allowNull = false,
        
        // seta se é chave primaria
        this.primaryKey = false,
        
        // seta o valor padrão
        this.defaultValue = null,
        
        // seta o tamanho   
        this.size = null;  

        // pega os dados do campo
        this._getFieldMetaData(); 
    }
    
    /**
     * _getFieldType
     * 
     * get the type of the field
     */
    _getFieldType( value ) {

        // se for do tipo ENUM
        if ( value['type'].indexOf('ENUM') === 0) {
            return { type: value.type, size: null  };
        } else {

            // declara as variaveis
            let _attr  = value['type'].toLowerCase();
            let val    = '';
            let length = null;
            
            if (_attr === "boolean" || _attr === "bit(1)") {
                val = 'BOOLEAN';
            } else if (_attr.match(/^(smallint|mediumint|tinyint|int)/)) {
                length = _attr.match(/\(\d+\)/);
                val = 'INTEGER';
            } else if (_attr.match(/^bigint/)) {
                val = 'BIGINT';
            } else if (_attr.match(/^string|varchar|varying|nvarchar/)) {
                length = _attr.match(/\(\d+\)/);
                val = 'STRING';
            } else if (_attr.match(/^char/)) {
                length = _attr.match(/\(\d+\)/);
                val = 'CHAR';
            } else if (_attr.match(/text|ntext$/)) {
                val = 'TEXT';
            } else if (_attr.match(/^(date)/)) {
                val = 'DATE';
            } else if (_attr.match(/^(time)/)) {
                val = 'TIME';
            } else if (_attr.match(/^(float|float4)/)) {
                val = 'FLOAT';
            } else if (_attr.match(/^decimal/)) {
                val = 'DECIMAL';
            } else if (_attr.match(/^(float8|double precision)/)) {
                val = 'DOUBLE';
            } else if (_attr.match(/^uuid|uniqueidentifier/)) {
                val = 'UUIDV4';
            } else if (_attr.match(/^json/)) {
                val = 'JSON';
            } else if (_attr.match(/^jsonb/)) {
                val = 'JSONB';
            } else if (_attr.match(/^geometry/)) {
                val = 'GEOMETRY';
            }

            // verifica se foi possivel obter o tamanho do campo
            length = ( length ) ? length.toString().replace('(', '').replace(')','') : null;
            
            // volta o valor
            return { type: val, size: length };
        }
    }

    /**
     * _getFieldMetaData
     * 
     * get the field metadata
     */
    _getFieldMetaData() {

        // pega os metadados da tabela
        const metadata = this.table.tblObject[this.name];
        
        // seta os atributos dos campos
        const type        = this._getFieldType( metadata );    
        this.type         = type['type'];
        this.size         = type['size'];
        this.allowNull    = metadata.allowNull;
        this.defaultValue = metadata.defaultValue;
        this.primaryKey   = metadata.primaryKey;

        // volta os dados obtidos
        return metadata;
    }
}

module.exports = Field;

/**
 * FK
 * 
 * the Fk class
 */
class FK {

    /**
     * constructor
     * 
     * the contructor method
     */
    constructor() {

        // tabela de origem
        this.sourceTable = null;

        // campo de origem
        this.sourceField = null;

        // tabela de destino
        this.targetTable = null;

        // campo de destino
        this.targetField = null;
    }
}

module.exports = FK;

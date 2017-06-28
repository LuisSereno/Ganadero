var Operacion = (function () {
    function Operacion() {
        this.id = 0;
        this.agrupacion = "";
        this.animales = new Array();
        this.precio = 0;
        this.fechaOperacion = new Date();
    }
    Operacion.prototype.getId = function () {
        return this.id;
    };
    Operacion.prototype.setId = function (identificador) {
        this.id = identificador;
    };
    Operacion.prototype.getAgrupacion = function () {
        return this.agrupacion;
    };
    Operacion.prototype.setAgrupacion = function (alias) {
        this.agrupacion = alias;
    };
    Operacion.prototype.getPrecio = function () {
        return this.precio;
    };
    Operacion.prototype.setPrecio = function (precio) {
        this.precio = precio;
    };
    Operacion.prototype.getFechaOperacion = function () {
        return this.fechaOperacion;
    };
    Operacion.prototype.setFechaOperacion = function (fech) {
        this.fechaOperacion = fech;
    };
    Operacion.prototype.getAnimales = function () {
        return this.animales;
    };
    Operacion.prototype.setAnimales = function (arrayAnimal) {
        this.animales = arrayAnimal;
    };
    return Operacion;
}());
export { Operacion };
//# sourceMappingURL=operacion.js.map
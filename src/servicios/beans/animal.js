var Animal = (function () {
    function Animal() {
        this.id = 0;
        this.alias = "";
        this.raza = "";
        this.foto = "";
        this.numero = 0;
        this.fechaNacimiento = new Date();
        this.vacunas = new Array();
        this.enfermedades = new Array();
        this.ascendencia = new Array();
        this.descendencia = new Array();
        this.precioCompra = 0;
        this.precioVenta = 0;
    }
    Animal.prototype.getId = function () {
        return this.id;
    };
    Animal.prototype.setId = function (identificador) {
        this.id = identificador;
    };
    Animal.prototype.getAlias = function () {
        return this.alias;
    };
    Animal.prototype.setAlias = function (alias) {
        this.alias = alias;
    };
    Animal.prototype.getRaza = function () {
        return this.raza;
    };
    Animal.prototype.setRaza = function (raza) {
        this.raza = raza;
    };
    Animal.prototype.getFoto = function () {
        return this.foto;
    };
    Animal.prototype.setFoto = function (foto) {
        if (foto != null && foto.trim() != "") {
            this.foto = foto;
        }
        else {
            this.foto = null;
        }
    };
    Animal.prototype.getNumero = function () {
        return this.numero;
    };
    Animal.prototype.setNumero = function (num) {
        this.numero = num;
    };
    Animal.prototype.getFechaNacimiento = function () {
        return this.fechaNacimiento;
    };
    Animal.prototype.setFechaNacimiento = function (fecNac) {
        this.fechaNacimiento = fecNac;
    };
    Animal.prototype.getVacunas = function () {
        return this.vacunas;
    };
    Animal.prototype.setVacunas = function (vacunas) {
        this.vacunas = vacunas;
    };
    Animal.prototype.getEnfermedades = function () {
        return this.enfermedades;
    };
    Animal.prototype.setEnfermedades = function (enf) {
        this.enfermedades = enf;
    };
    Animal.prototype.getAscendencia = function () {
        return this.ascendencia;
    };
    Animal.prototype.setAscendencia = function (ascen) {
        this.ascendencia = ascen;
    };
    Animal.prototype.getDescendencia = function () {
        return this.descendencia;
    };
    Animal.prototype.setDescendencia = function (descen) {
        this.descendencia = descen;
    };
    Animal.prototype.getPrecioCompra = function () {
        return Number(this.precioCompra);
    };
    Animal.prototype.setPrecioCompra = function (precio) {
        this.precioCompra = Number(precio);
    };
    Animal.prototype.getPrecioVenta = function () {
        return Number(this.precioVenta);
    };
    Animal.prototype.setPrecioVenta = function (precio) {
        this.precioVenta = Number(precio);
    };
    return Animal;
}());
export { Animal };
//# sourceMappingURL=animal.js.map
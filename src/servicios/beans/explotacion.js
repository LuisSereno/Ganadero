var Explotacion = (function () {
    function Explotacion() {
        this.id = 0;
        this.nombre = "";
        this.emailUsu = "";
        this.fechaAlta = new Date();
        this.fechaUltimaEntrada = new Date();
        this.dineroTotal = 0;
        this.dineroAnual = 0;
        this.arrayMachos = new Array();
        this.arrayHembras = new Array();
        this.arrayCompras = new Array();
        this.arrayVentas = new Array();
        this.arrayDocumentos = new Array();
    }
    Explotacion.prototype.getId = function () {
        return this.id;
    };
    Explotacion.prototype.setId = function (identificador) {
        this.id = identificador;
    };
    Explotacion.prototype.getNombre = function () {
        return this.nombre;
    };
    Explotacion.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Explotacion.prototype.getEmailUsu = function () {
        return this.emailUsu;
    };
    Explotacion.prototype.setEmailUsu = function (email) {
        this.emailUsu = email;
    };
    Explotacion.prototype.getFechaAlta = function () {
        return this.fechaAlta;
    };
    Explotacion.prototype.setFechaAlta = function (fech) {
        this.fechaAlta = fech;
    };
    Explotacion.prototype.getFechaUltimaEntrada = function () {
        return this.fechaUltimaEntrada;
    };
    Explotacion.prototype.setFechaUltimaEntrada = function (fech) {
        this.fechaUltimaEntrada = fech;
    };
    Explotacion.prototype.getDineroTotal = function () {
        return this.dineroTotal;
    };
    Explotacion.prototype.setDineroTotal = function (precio) {
        this.dineroTotal = precio;
    };
    Explotacion.prototype.getDineroAnual = function () {
        return this.dineroAnual;
    };
    Explotacion.prototype.setDineroAnual = function (precio) {
        this.dineroAnual = precio;
    };
    Explotacion.prototype.getArrayMachos = function () {
        return this.arrayMachos;
    };
    Explotacion.prototype.setArrayMachos = function (arrayAnimal) {
        this.arrayMachos = arrayAnimal;
    };
    Explotacion.prototype.getArrayHembras = function () {
        return this.arrayHembras;
    };
    Explotacion.prototype.setArrayHembras = function (arrayAnimal) {
        this.arrayHembras = arrayAnimal;
    };
    Explotacion.prototype.getArrayCompras = function () {
        return this.arrayCompras;
    };
    Explotacion.prototype.setArrayCompras = function (arrayCompras) {
        this.arrayCompras = arrayCompras;
    };
    Explotacion.prototype.getArrayVentas = function () {
        return this.arrayVentas;
    };
    Explotacion.prototype.setArrayVentas = function (arrayVentas) {
        this.arrayVentas = arrayVentas;
    };
    Explotacion.prototype.getArrayDocumentos = function () {
        return this.arrayDocumentos;
    };
    Explotacion.prototype.setArrayDocumentos = function (arrayDocumentos) {
        this.arrayDocumentos = arrayDocumentos;
    };
    /**
       ESTA PARTE ES OBLIGADA PARA USAR LOS JSON Y ENVIARLE LAS ENTIDADES
       http://choly.ca/post/typescript-json/
    **/
    // toJSON is automatically used by JSON.stringify
    Explotacion.prototype.toJSON = function () {
        // copy all fields from `this` to an empty object and return in
        var json = Object.assign({}, this);
        return json;
    };
    // fromJSON is used to convert an serialized version
    // of the User to an instance of the class
    Explotacion.fromJSON = function (json) {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Explotacion.reviver);
        }
        else {
            // create an instance of the User class
            var mach = Object.create(Explotacion.prototype);
            /**            let jsonNuevo = {
                            idCliente: json["_idCliente"],
                            nombreCliente: json["_nombreCliente"],
                            url: json["_url"],
                            dominio: json["_dominio"],
                            fecha: json["_fecha"],
                            licMov: json["_licMov"],
                            licWeb: json["_licWeb"],
                            clienteActivo: json["_clienteActivo"],
                            maps: json["_maps"]
                        }**/
            // copy all the fields from the json object
            return Object.assign(mach, json, {
                // convert fields that need converting. ESto es para formatear datos que sean imprescindibles, como fechas y demas
                fechaAlta: (json["fechaAlta"] == null || json["fechaAlta"].toString() == "") ? null : new Date(json["fechaAlta"]),
                id: (json["identificador"]),
                arrayMachos: new Array(),
                arrayHembras: new Array(),
                arrayVentas: new Array(),
                arrayCompras: new Array(),
                arrayDocumentos: new Array()
            });
        }
    };
    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    Explotacion.reviver = function (key, value) {
        return key === "" ? Explotacion.fromJSON(value) : value;
    };
    return Explotacion;
}());
export { Explotacion };
//# sourceMappingURL=explotacion.js.map
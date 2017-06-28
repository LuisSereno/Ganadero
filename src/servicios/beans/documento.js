var Documento = (function () {
    function Documento() {
        this.id = 0;
        this.nombre = "";
        this.url = "";
        this.tipo = "";
        this.fechaAlta = new Date();
        this.usuarioAlta = "";
    }
    Documento.prototype.getId = function () {
        return this.id;
    };
    Documento.prototype.setId = function (identificador) {
        this.id = identificador;
    };
    Documento.prototype.getNombre = function () {
        return this.nombre;
    };
    Documento.prototype.setNombre = function (nom) {
        this.nombre = nom;
    };
    Documento.prototype.getUrl = function () {
        return this.url;
    };
    Documento.prototype.setUrl = function (url) {
        this.url = url;
    };
    Documento.prototype.getTipo = function () {
        return this.tipo;
    };
    Documento.prototype.setTipo = function (tip) {
        this.tipo = tip;
    };
    Documento.prototype.getFechaAlta = function () {
        return this.fechaAlta;
    };
    Documento.prototype.setFechaAlta = function (fecha) {
        this.fechaAlta = fecha;
    };
    Documento.prototype.setUsuarioAlta = function (usuario) {
        this.usuarioAlta = usuario;
    };
    Documento.prototype.getUsuarioAlta = function () {
        return this.usuarioAlta;
    };
    /**
          ESTA PARTE ES OBLIGADA PARA USAR LOS JSON Y ENVIARLE LAS ENTIDADES
          http://choly.ca/post/typescript-json/
       **/
    // toJSON is automatically used by JSON.stringify
    Documento.prototype.toJSON = function () {
        // copy all fields from `this` to an empty object and return in
        var json = Object.assign({}, this);
        return json;
    };
    // fromJSON is used to convert an serialized version
    // of the User to an instance of the class
    Documento.fromJSON = function (json) {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Documento.reviver);
        }
        else {
            // create an instance of the User class
            var docu = Object.create(Documento.prototype);
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
            return Object.assign(docu, json, {
                // convert fields that need converting. ESto es para formatear datos que sean imprescindibles, como fechas y demas
                fechaNacimiento: (json["fechaAlta"] == null || json["fechaAlta"].toString() == "") ? null : new Date(json["fechaAlta"])
            });
        }
    };
    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    Documento.reviver = function (key, value) {
        return key === "" ? Documento.fromJSON(value) : value;
    };
    return Documento;
}());
export { Documento };
//# sourceMappingURL=documento.js.map
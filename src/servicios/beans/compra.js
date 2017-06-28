var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Operacion } from './operacion';
var Compra = (function (_super) {
    __extends(Compra, _super);
    function Compra(id, agru, animales, pCompra, fecha) {
        var _this = _super.call(this) || this;
        _this.setId(id);
        _this.setAgrupacion(agru);
        _this.setAnimales(animales);
        _this.setPrecio(pCompra);
        _this.setFechaOperacion(fecha);
        return _this;
    }
    /**
       ESTA PARTE ES OBLIGADA PARA USAR LOS JSON Y ENVIARLE LAS ENTIDADES
       http://choly.ca/post/typescript-json/
    **/
    // toJSON is automatically used by JSON.stringify
    Compra.prototype.toJSON = function () {
        // copy all fields from `this` to an empty object and return in
        var json = Object.assign({}, this);
        return json;
    };
    // fromJSON is used to convert an serialized version
    // of the User to an instance of the class
    Compra.fromJSON = function (json) {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Compra.reviver);
        }
        else {
            // create an instance of the User class
            var mach = Object.create(Compra.prototype);
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
                fechaOperacion: (json["fechaOperacion"] == null || json["fechaOperacion"].toString() == "") ? null : new Date(json["fechaOperacion"])
            });
        }
    };
    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    Compra.reviver = function (key, value) {
        return key === "" ? Compra.fromJSON(value) : value;
    };
    return Compra;
}(Operacion));
export { Compra };
//# sourceMappingURL=compra.js.map
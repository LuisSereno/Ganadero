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
import { Animal } from './animal';
import { Constantes } from '../constantes';
var Hembra = (function (_super) {
    __extends(Hembra, _super);
    function Hembra(id, alias, raza, foto, numero, fechaNacimiento, vacu, enfer, fechaUltimoNacimiento, ascen, descen, precioCompra, precioVenta) {
        var _this = _super.call(this) || this;
        _this.setId(id);
        _this.setAlias(alias);
        _this.setRaza(raza);
        _this.setFoto(foto);
        _this.setNumero(numero);
        _this.setFechaNacimiento(fechaNacimiento);
        _this.setVacunas(vacu);
        _this.setEnfermedades(enfer);
        _this.setFechaUltimoNacimiento(fechaUltimoNacimiento);
        _this.setAscendencia(ascen);
        _this.setDescendencia(descen);
        _this.setPrecioCompra(precioCompra);
        _this.setPrecioVenta(precioVenta);
        return _this;
    }
    Hembra.prototype.setFechaUltimoNacimiento = function (fecUlti) {
        this.fechaUltimoNacimiento = fecUlti;
    };
    Hembra.prototype.getFechaUltimoNacimiento = function () {
        return this.fechaUltimoNacimiento;
    };
    Hembra.prototype.getFoto = function () {
        if (_super.prototype.getFoto.call(this) != null) {
            return _super.prototype.getFoto.call(this);
        }
        else {
            return Constantes.FOTO_ANIMAL_DEFECTO;
        }
    };
    /**
          ESTA PARTE ES OBLIGADA PARA USAR LOS JSON Y ENVIARLE LAS ENTIDADES
          http://choly.ca/post/typescript-json/
       **/
    // toJSON is automatically used by JSON.stringify
    Hembra.prototype.toJSON = function () {
        // copy all fields from `this` to an empty object and return in
        var json = Object.assign({}, this);
        var arrayIds = new Array();
        for (var _i = 0, _a = this.getDescendencia(); _i < _a.length; _i++) {
            var anim = _a[_i];
            arrayIds.push(anim.getId());
        }
        json["descendenciaIds"] = arrayIds;
        arrayIds = new Array();
        for (var _b = 0, _c = this.getAscendencia(); _b < _c.length; _b++) {
            var anim = _c[_b];
            arrayIds.push(anim.getId());
        }
        json["ascendenciaIds"] = arrayIds;
        json["sexo"] = Constantes.HEMBRA;
        return json;
    };
    // fromJSON is used to convert an serialized version
    // of the User to an instance of the class
    Hembra.fromJSON = function (json) {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Hembra.reviver);
        }
        else {
            // create an instance of the User class
            var hemb = Object.create(Hembra.prototype);
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
            return Object.assign(hemb, json, {
                // convert fields that need converting. ESto es para formatear datos que sean imprescindibles, como fechas y demas
                id: json["identificador"],
                fechaNacimiento: (json["fechaNacimiento"] == null || json["fechaNacimiento"].toString() == "") ? null : new Date(json["fechaNacimiento"]),
                fechaUltimoNacimiento: (json["fechaUltimoNacimiento"] == null || json["fechaUltimoNacimiento"].toString() == "") ? null : new Date(json["fechaUltimoNacimiento"])
            });
        }
    };
    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    Hembra.reviver = function (key, value) {
        return key === "" ? Hembra.fromJSON(value) : value;
    };
    return Hembra;
}(Animal));
export { Hembra };
//# sourceMappingURL=hembra.js.map
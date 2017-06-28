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
var Macho = (function (_super) {
    __extends(Macho, _super);
    function Macho(id, alias, raza, foto, numero, fechaNacimiento, vacu, enfer, ascen, descen, precioCompra, precioVenta) {
        var _this = _super.call(this) || this;
        _this.setId(id);
        _this.setAlias(alias);
        _this.setRaza(raza);
        _this.setFoto(foto);
        _this.setNumero(numero);
        _this.setFechaNacimiento(fechaNacimiento);
        _this.setVacunas(vacu);
        _this.setEnfermedades(enfer);
        _this.setAscendencia(ascen);
        _this.setDescendencia(descen);
        _this.setPrecioCompra(precioCompra);
        _this.setPrecioVenta(precioVenta);
        return _this;
    }
    Macho.prototype.getFoto = function () {
        if (_super.prototype.getFoto.call(this) != null) {
            return _super.prototype.getFoto.call(this);
        }
        else {
            return Constantes.FOTO_ANIMAL_MACHO_DEFECTO;
        }
    };
    /**
          ESTA PARTE ES OBLIGADA PARA USAR LOS JSON Y ENVIARLE LAS ENTIDADES
          http://choly.ca/post/typescript-json/
       **/
    // toJSON is automatically used by JSON.stringify
    Macho.prototype.toJSON = function () {
        // copy all fields from `this` to an empty object and return in
        var json = Object.assign({}, this);
        var arrayIds = new Array();
        for (var _i = 0, _a = this.getDescendencia(); _i < _a.length; _i++) {
            var anim = _a[_i];
            arrayIds.push(anim.getId());
        }
        //json["descendencia"]=arrayIds;
        arrayIds = new Array();
        for (var _b = 0, _c = this.getAscendencia(); _b < _c.length; _b++) {
            var anim = _c[_b];
            arrayIds.push(anim.getId());
        }
        //json["ascendencia"]=arrayIds;
        json["sexo"] = Constantes.MACHO;
        return json;
    };
    // fromJSON is used to convert an serialized version
    // of the User to an instance of the class
    Macho.fromJSON = function (json) {
        if (typeof json === 'string') {
            // if it's a string, parse it first
            return JSON.parse(json, Macho.reviver);
        }
        else {
            // create an instance of the User class
            var mach = Object.create(Macho.prototype);
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
                fechaNacimiento: (json["fechaNacimiento"] == null || json["fechaNacimiento"].toString() == "") ? null : new Date(json["fechaNacimiento"])
            });
        }
    };
    // reviver can be passed as the second parameter to JSON.parse
    // to automatically call User.fromJSON on the resulting value.
    // Ejemplo de uso let user = JSON.parse(data, User.reviver);
    Macho.reviver = function (key, value) {
        return key === "" ? Macho.fromJSON(value) : value;
    };
    return Macho;
}(Animal));
export { Macho };
//# sourceMappingURL=macho.js.map
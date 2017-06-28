import { Compra } from './beans/compra';
import { Venta } from './beans/venta';
import 'rxjs/add/operator/map';
import { FuncionesGenerales } from './funcionesGenerales';
import { Hembra } from './beans/hembra';
import { Macho } from './beans/macho';
var ServicioCompraVenta = (function () {
    function ServicioCompraVenta(compra, servDatos) {
        this.servDatos = servDatos;
        this.compra = compra;
        this.totalDinero = 0;
        this.arrayAnimales = new Array();
    }
    ServicioCompraVenta.prototype.anadirAnimal = function (anim) {
        this.arrayAnimales.push(anim);
        if (this.compra) {
            this.totalDinero += anim.getPrecioCompra();
        }
        else {
            this.totalDinero += anim.getPrecioVenta();
        }
    };
    ServicioCompraVenta.prototype.crearOperacion = function (operacion) {
        var url = "";
        var guardadoCorrecto = false;
        try {
            if (operacion instanceof Venta) {
                url = "/ruta/fantastica/venta";
                if (this.servDatos.getExplotacion().getArrayVentas()) {
                    this.servDatos.getExplotacion().getArrayVentas().push(operacion);
                }
                else {
                    var arrayVentas = new Array();
                    arrayVentas.push(operacion);
                    this.servDatos.getExplotacion().setArrayVentas(arrayVentas);
                }
                if (operacion.getAnimales()) {
                    for (var _i = 0, _a = operacion.getAnimales(); _i < _a.length; _i++) {
                        var anim = _a[_i];
                        var resultado = FuncionesGenerales.buscaBorraArray(this.servDatos.getExplotacion().getArrayHembras(), anim);
                        if (!resultado) {
                            FuncionesGenerales.buscaBorraArray(this.servDatos.getExplotacion().getArrayMachos(), anim);
                        }
                    }
                }
            }
            else if (operacion instanceof Compra) {
                url = "/ruta/fantastica/compra";
                if (this.servDatos.getExplotacion().getArrayCompras()) {
                    this.servDatos.getExplotacion().getArrayCompras().push(operacion);
                }
                else {
                    var arrayCompras = new Array();
                    arrayCompras.push(operacion);
                    this.servDatos.getExplotacion().setArrayCompras(arrayCompras);
                }
                if (operacion.getAnimales()) {
                    for (var _b = 0, _c = operacion.getAnimales(); _b < _c.length; _b++) {
                        var anim = _c[_b];
                        if (anim instanceof Macho) {
                            this.servDatos.getExplotacion().getArrayMachos().push(anim);
                        }
                        else if (anim instanceof Hembra) {
                            this.servDatos.getExplotacion().getArrayHembras().push(anim);
                        }
                    }
                }
            }
            else {
                throw "No es una operacion";
            }
            //this.httpLocal.post(url, {venta: venta.toJSON(),idExplotacion:this.servDatos.getExplotacion().getId()}).map(res => res.json());
            guardadoCorrecto = true;
        }
        catch (ex) {
            console.log(ex);
        }
        return guardadoCorrecto;
    };
    return ServicioCompraVenta;
}());
export { ServicioCompraVenta };
//# sourceMappingURL=servicioCompraVenta.js.map
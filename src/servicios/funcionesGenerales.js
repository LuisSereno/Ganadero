var FuncionesGenerales = (function () {
    function FuncionesGenerales() {
    }
    FuncionesGenerales.buscaBorraArray = function (array, msg) {
        var index = array.indexOf(msg);
        if (index !== -1) {
            array.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    };
    return FuncionesGenerales;
}());
export { FuncionesGenerales };
//# sourceMappingURL=funcionesGenerales.js.map
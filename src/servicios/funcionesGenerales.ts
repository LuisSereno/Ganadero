export class FuncionesGenerales {

	public static buscaBorraArray(array:Array<any>,msg:any):boolean {
	    let index: number = array.indexOf(msg);
	    if (index !== -1) {
	        array.splice(index, 1);
	        return true;
	    }else{
	    	return false;
	    }        
	}

}


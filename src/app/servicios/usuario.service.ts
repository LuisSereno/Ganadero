import { Injectable, Inject } from '@angular/core';
import { IEusuarioServicio } from './interfaces/usuario.service.interface';
import { IEUsuario } from './beans/interfaces/usuario.interface';
import { ConexionGenericaService } from './conexionGenerica.service';
import { Constantes } from './genericos/constantes';

@Injectable()
export class UsuarioServicio  implements IEusuarioServicio{

    usuario: IEUsuario;

    constructor(@Inject('UsuarioConexionServicio') private conn: ConexionGenericaService<IEUsuario>) {
        this.conn.crearConexion(Constantes.prefixDatabaseProject + "usuarios") ;
    }

    obtenerUsuario(usuario: IEUsuario): Promise<IEUsuario> {
        return new Promise((resolve, reject) => {
            return this.conn.getObject(btoa(usuario.email)).subscribe((user:IEUsuario) => {
                if (user==null){
                    reject(new Error("No existe el usuario"));
                }else{
                    usuario=user;
                    resolve(usuario);
                }
            }, err=>{
                console.error("Error finding user: ", err);
                reject(new Error("No existe el usuario"));   
            })
        });
    }
    guardaUsuario(usuario: IEUsuario): Promise<IEUsuario> {
        return new Promise((resolve, reject) => {
            let idUser=btoa(usuario.email);
            this.conn.addObjectWithID(usuario,idUser).then(function() {
                usuario.id=idUser;
                resolve(usuario);
            })
            .catch(function(error) {
                console.error("Error adding user: ", error);
                reject(new Error("No guardado")); 
            });
        });
    }
    actualizarUsuario(usuario: IEUsuario): Promise<IEUsuario> {
        return new Promise((resolve, reject) => {
            this.conn.updateObject(usuario).then(function(docRef) {
                console.log("Document update" , docRef);
                resolve(usuario);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                reject(new Error("No actualizado")); 
            });;
        });
    }


}
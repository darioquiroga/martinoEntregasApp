import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { tiposUsuarios } from '../shared/constants/tiposUsuarios';
import { Camionero } from '../modelo/camionero';

@Injectable()
export class StorageService {
    constructor(private storage: Storage) { }

    /**
     * Setear algo en el localStorage, puede ser un json
     */
    private setObject = (key: string) => (value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * Obtener algo del localStorage
     */
    private getObject = (key: string) => {
        var value = localStorage.getItem(key);
        return value && JSON.parse(value);
    }


    setToken = (token: string) => localStorage.setItem('token', token)

    getToken = () =>
        new Promise(
            resolve => resolve(
                localStorage.getItem('token')
            )
        )

    setUsuarioActivo = (usuarioOCamionero: any) =>
        this.setObject('usuarioActivo')(usuarioOCamionero)




    getUsuarioActivo = () =>
        new Promise<any>(
            resolve => {
                const plainUserActivo = this.getObject('usuarioActivo');

                resolve(
                    plainUserActivo && plainUserActivo.cuitEmpTrans ?
                        new Camionero(plainUserActivo) :
                        new Usuario(
                            plainUserActivo
                        )
                )
            }
        )

    removeUsuarioActivo = () => localStorage.clear();


    // Sync
    getUsuarioActivoSync = () => {
        const plainUserActivo = this.getObject('usuarioActivo');
        // Si camionero crea un cambionero, si es coun, crea comun, si es puerto, crea puerto
        return plainUserActivo && plainUserActivo.cuitEmpTrans ?
            new Camionero(plainUserActivo) :
                plainUserActivo && plainUserActivo.idUsuario ?
                new Usuario(
                    plainUserActivo
                ) :
                    plainUserActivo && plainUserActivo.usuarioPK ?
                    new Usuario(
                        plainUserActivo,
                        true
                    ) :
                    null
    }

}






/*

    setToken(token: string) {
        this.storage.set('token', token);
    }

    getToken() {
        return this.storage.get('token');
    }

    // Setea como usuarioActiov un user comun o un camionero
    setUsuarioActivo(usuarioOCamionero: any) {
        this.storage.set('usuarioActivo', usuarioOCamionero);
    }

    getUsuarioActivo() {

        return this.storage.get('usuarioActivo');
    }

    // Borra el usuario activo y el token
    removeUsuarioActivo() {
        this.storage.remove('usuarioActivo');
        this.storage.remove('token');
    }


*/



    // TODO: Esto es viejo, se puede hacer mejor. En algún momento se cambiará
    // Este método es raro, acá se setea el usuario activo pero se espera a que este efectivamente se haya seteado en el storage
    // Tuve la necedidad de usarlo para poder observar los cambios en menusettings, ver su implementacion para entender mejor
    // setUsuarioActivoAndWaitForFinish(usuarioOCamionero: any) {
    //     // Creo una promesa que checkea que se haya seteado el usuario, para luego retornar
    //     return new Promise(async(resolve) => {
    //         // Seteo el user
    //         this.storage.set('usuarioActivo', usuarioOCamionero);

    //         this.storage.get('usuarioActivo').then(fafa => {
    //             resolve(true);
    //         })


    //     });
    //     // return new Promise(async(resolve) => {
    //     //     // Seteo el user
    //     //     this.storage.set('usuarioActivo', usuarioOCamionero);
    //     //
    //     //     // Lo obtengo para ver si está okey
    //     //     await this.getUsuarioActivo();
    //     //
    //     //     // Listo, ya se terminó de guardo el user activo
    //     //     resolve(true);
    //     // });
    // }

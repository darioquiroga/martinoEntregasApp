import { Perfil } from "./perfil";
import { Tipo } from "./tipo";
import { modosNotificacion } from "../shared/constants/modosNotificacion";
import { perfilesUsuarios } from "../shared/constants/perfilesUsuarios";
import { tiposUsuarios } from "../shared/constants/tiposUsuarios";

export class Usuario {
    idUsuario: string;
    nombre: string;
    clave: string;
    tipo: Tipo;
    perfil: Perfil | undefined;
    modoNotificacion: number;

    constructor (usuario: any, puertos = false) {

        if (!puertos) {
            this.idUsuario = usuario.idUsuario;
            this.nombre = usuario.nombre;
            this.clave = usuario.clave;
            this.tipo = new Tipo(usuario.tipo);

            if (usuario.perfil) {
                this.perfil = new Perfil(usuario.perfil);
            }
            this.modoNotificacion = usuario.modoNotificacion;
        } else {
            this.idUsuario = usuario.usuarioPK.nombre;
            this.nombre = usuario.operador;
            this.clave = usuario.pass;

            this.tipo = new Tipo({
                id: tiposUsuarios.PUERTOS,
                descripcion: 'PUERTOS'
            });

            // Son siempre autorizadores los de puerto
            this.perfil = new Perfil({
                id: perfilesUsuarios.USUARIO_AUTORIZACION,
                descripcion: 'Usuario Autorizacion',
                permisos: []
            });
            this.modoNotificacion = modosNotificacion.NONE;
        }
    }

}

import { Permiso } from "./permiso";

export class Perfil {
    id: number;
    descripcion: string;
    permisos: Permiso[];

    constructor(perfil: {
        id: number;
        descripcion: string;
        permisos: {id: number, descripcion: string, url: string}[]
    }) {
        this.id = perfil.id;
        this.descripcion = perfil.descripcion;
        this.permisos = perfil.permisos.map(permiso => new Permiso(permiso));
    }
}

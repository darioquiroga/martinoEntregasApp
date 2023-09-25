export class RubroAnalisis {
    idRubro: number | undefined;
    descripcion: string | undefined;
    descripcionCorta: string | undefined;

    constructor(rubro: {
        idRubro: number;
        descripcion: string;
        descripcionCorta: string;
    }) {
        if (rubro) {
            this.idRubro = rubro.idRubro;
            this.descripcion = rubro.descripcion;
            this.descripcionCorta = rubro.descripcionCorta;
        }
    }
}

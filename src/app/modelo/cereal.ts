export class Cereal {
    idCereal!: number;
    nombre!: string;
    constructor(cereal: {
        idCereal: number;
        nombre: string;
    }){
        if (cereal) {
            this.idCereal = cereal.idCereal;
            this.nombre = cereal.nombre;
        }
    }
}

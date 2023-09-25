export class AnalisisPuerto {
    anl_porc_analisis: number;
    anl_porc_merma: number;
    anl_kilos_merma: number;
    anl_cantidad: number;
    anl_rubro: number;
    rbr_abrev: string;
    Rbr_Descripcion: string

    constructor(analisisPuerto?: {
        anl_porc_analisis: number;
        anl_porc_merma: number;
        anl_kilos_merma: number;
        anl_cantidad: number;
        anl_rubro: number;
        rbr_abrev: string;
        Rbr_Descripcion: string
    }) {
        if (analisisPuerto) {
            this.anl_porc_analisis = analisisPuerto.anl_porc_analisis;
            this.anl_porc_merma = analisisPuerto.anl_porc_merma;
            this.anl_kilos_merma = analisisPuerto.anl_kilos_merma;
            this.anl_cantidad = analisisPuerto.anl_cantidad;
            this.anl_rubro = analisisPuerto.anl_rubro;
            this.rbr_abrev = analisisPuerto.rbr_abrev;
            this.Rbr_Descripcion = analisisPuerto.Rbr_Descripcion
        } else {
            this.anl_porc_analisis = null;
            this.anl_porc_merma = null;
            this.anl_kilos_merma = null;
            this.anl_cantidad = null;
            this.anl_rubro = null;
            this.rbr_abrev = null;
            this.Rbr_Descripcion = null
        }
    }

}

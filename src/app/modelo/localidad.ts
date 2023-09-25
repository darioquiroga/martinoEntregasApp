import { Partido } from "./partido";

export class Localidad {
  ncLocalidad: number;
  descripcion: string;
  partido: Partido = new Partido({});

  constructor(localidad: {
      ncLocalidad: number;
      descripcion: string;
      partido?: {
          ncPartido: number;
          descripcion: string;
          provincia: {
              ncProvincia: number;
              descripcion: string;
          }
      }
  }) {
      this.ncLocalidad = localidad.ncLocalidad;
      this.descripcion = localidad.descripcion;
      if (localidad.partido) {
          this.partido = new Partido(localidad.partido);

      }
  }
}


export class Control {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public codigo : number;
  public descripcion: string;
  public descripcionLarga: string;
  public version: string;
  public versionLib : string;
  //---------------------------------------------//

  // parseo el mensaje
  constructor(control : any){
      this.codigo = control.codigo;
      this.descripcion = control.nombre;
      this.descripcionLarga = control.email;
      this.version = control.version;
      this.versionLib = control.versionLib;
  }
}

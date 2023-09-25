/**
* Esta clase se creo para representar la parte del mensaje que contiene los
* datos de la cuenta
*/
export class Cuenta {

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public id : string;
  public nombre: string;
  public email: string;
  //---------------------------------------------//

  // parseo el mensaje
  constructor(cuenta : any){
      this.id = cuenta.id;
      this.nombre = cuenta.nombre;
      this.email = cuenta.email;
  }
}

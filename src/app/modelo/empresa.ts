/**
* Esta clase se creo para representar la parte del mensaje que contiene los
* datos de la empresa
*/
export class Empresa{

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public id : string;
  public nombre : string;
  public nombreCompleto : string;
  public cuit : string;
  public direccion: string;
  public telefonos: string;
  public informacionContacto : string;
  public horariosAtencion : string;
  public dominio : string;
  public email : string;
  public accesoAppMovil: string;
  public coopeHash : string;




  //---------------------------------------------//

  // parseo el mensaje
  constructor( empresa:any ){
    this.id = empresa.Id;
    this.nombre = empresa.Nombre;
    this.nombreCompleto = empresa.NombreCompleto;
    this.cuit = empresa.Cuit;
    this.direccion = empresa.Direccion;
    this.telefonos = empresa.Telefonos;
    this.informacionContacto = empresa.InformacionContacto;
    this.horariosAtencion = empresa.HorariosAtencion;
    this.dominio = empresa.Dominio;
    this.email = empresa.Email;
    this.accesoAppMovil = empresa.AccesoAppMovil;
    this.coopeHash = empresa.CoopeHash;


  }
}

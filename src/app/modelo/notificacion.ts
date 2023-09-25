export class Notificacion {

    //---------------------------------------------//
    // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
    //---------------------------------------------//
    public idMensaje: number | null;
    public mensaje: string | null;
    public parametros1: string | null;
    public parametros2: string | null;
    public parametros3: string | null;
    public idNotificacion: number | null;
    public fechaEnvio: Date | null;
    public visto: boolean | null;
    public fechaVisto: Date | null;
    public visible: boolean | null;
    public titulo: string | null;

    //---------------------------------------------//
  
    // Parseo el mensaje
    constructor( mov : Notificacion) {
        if(mov) {
            this.idMensaje = mov.idMensaje;
            this.mensaje = mov.mensaje;
            this.parametros1 = mov.parametros1;
            this.parametros2 = mov.parametros2;
            this.visible = mov.visible;
            this.parametros3 = mov.parametros3;
            this.idNotificacion = mov.idNotificacion;
            this.visto = mov.visto;
            this.fechaEnvio = mov.fechaEnvio ? new Date(mov.fechaEnvio) : null;
            this.fechaVisto = mov.fechaVisto ? new Date(mov.fechaVisto) : null;
            this.titulo = mov.titulo;
        } else {
            this.idMensaje = null;
            this.mensaje = null;
            this.parametros1 = null;
            this.parametros2 = null;
            this.visible = null;
            this.parametros3 = null;
            this.idNotificacion = null;
            this.visto = null;
            this.fechaEnvio = null;
            this.fechaVisto = null;
            this.titulo = null;
        }
    }
  }
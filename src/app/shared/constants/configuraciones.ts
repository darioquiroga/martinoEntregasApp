export class Configuraciones {
    // LOCAL

    // PRODUCCIÓN
    public static nombreEntregador: string = "Martino Entregas"
    public static urlBase: string = "https://ws.cerealnet.com/cerealnetServiciosWebV4/ws";
    //public static urlBase: string = "https://190.210.222.177:48080/cerealnetServiciosWebV4/ws";
    //public static urlBasePuertos: string = "https://ws.cerealnet.com/cerealnetPuertosRest-1.0-SNAPSHOT/ws";
    public static urlBasePuertos: string = "https://ws.cerealnet.com/cerealnetPuertosRest-1.0-SNAPSHOT/ws";

    public static miCuentaUrl: string = "https://ws.cerealnet.com/cerealnetServiciosWebV4/ws/mi-cuenta";
    public static dummyUrl: string ="https://ws.cerealnet.com/cerealnetServiciosWebV4/ws";
    public static notificacionesUrl: string = "https://ws.cerealnet.com/cerealnetServiciosWeb4/ws/notifiaciones";

    public static authUrl: string = `${Configuraciones.urlBase}/usuario/login/`;
    public static authPuertosUrl: string = `${Configuraciones.urlBasePuertos}/usuario/login/`;
    public static timeoutDefault: number = 120000;  //120 seg
    public static servicioRss2JsonURL: string = "https://api.rss2json.com/v1/api.json?rss_url=";
    public static wapiUrl : string = "https://www.kernelinformatica.com.ar/webservices/ws-envia-wu.php";
    //https://www.kernelinformatica.com.ar//app/webservices/public/ws-envia-wu.php?token=Token 33b8c0ae0e9b533d97eddd7f58087ff308276407&to=543416435556&message=hola mundo
    //"/wapi"//"https://wapi.im/api/messages";
    //public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/servicios-web-rest.php`;
     public static version : string = "0.2";
     // token para envio de whats up
     // el token debe ser enviado desde el back end
     //a441bd60784918d8bd65e5d7d21b91148f5ee307

     public static tokenWapi: string = ""


    // Servicio push
    public static oneSignalCredenciales = {
        appId: '00000000-0000-0000-0000-00000000000',
        googleProjectnumber: '000000000000'
    }
    public static rutaLogos : string = "https://www.kernelinformatica.com.ar/applications/apps/gestagro/logos/";
    public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/ws.php`;
    //public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/servicios-web-rest.php`;

    // Cantidad de items que se muestran en la lista de posicion dia
    public static lazyLoadSize = 20;


    /*celulares de contacto*/
    public static celu_1 = 5493416192379;
    public static celu_2 = 5493413709702;
    public static celu_3 = 5493413709701;
    public static celu_da = 5493416435556;
    public static celu_su = 5493416417920;
    public static celu_her =5493416903752;

}

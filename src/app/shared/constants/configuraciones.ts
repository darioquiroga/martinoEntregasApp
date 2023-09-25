export class Configuraciones {
    // LOCAL

    // PRODUCCIÓN

    public static urlBase: string = "https://ws.cerealnet.com/cerealnetServiciosWebV2/ws";
    public static urlBasePuertos: string = "https://ws.cerealnet.com/cerealnetPuertosRest-1.0-SNAPSHOT/ws";

    public static miCuentaUrl: string = "https://ws.cerealnet.com/cerealnetServiciosWebV2/ws/mi-cuenta";
    public static dummyUrl: string ="https://ws.cerealnet.com/cerealnetServiciosWebV2/ws";
    public static notificacionesUrl: string = "https://ws.cerealnet.com/cerealnetServiciosWebV2/ws/notifiaciones";

    public static authUrl: string = `${Configuraciones.urlBase}/usuario/login/`;
    public static authPuertosUrl: string = `${Configuraciones.urlBasePuertos}/usuario/login/`;
    public static timeoutDefault: number = 120000;  //120 seg
    public static servicioRss2JsonURL: string = "https://api.rss2json.com/v1/api.json?rss_url=";

    // Servicio push
    public static oneSignalCredenciales = {
        appId: 'c7904741-cfbf-4e4a-b373-197d53fa659b',
        googleProjectnumber: '819718918776'
    }
    public static rutaLogos : string = "https://www.kernelinformatica.com.ar/applications/apps/gestagro/logos/";
    public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/ws.php`;
    //public static serviciosWebURL : string = `https://www.kernelinformatica.com.ar/app/webservices/public/servicios-web-rest.php`;
    public static version : string = "2";
    // Cantidad de items que se muestran en la lista de posicion dia
    public static lazyLoadSize = 20;

}

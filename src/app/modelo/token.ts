export class Token {
    public hashId : string;
    public fechaDesde : string;
    public fechaHasta : string;
    constructor(token : any){
        this.hashId = token.id;
        this.fechaDesde = token.fechaDesde;
        this.fechaHasta = token.fechaHasta;
    }
}
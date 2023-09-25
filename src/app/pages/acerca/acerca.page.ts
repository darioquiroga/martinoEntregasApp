import { Empresa } from 'src/app/modelo/empresa';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Configuraciones } from 'src/app/shared/constants/configuraciones';


@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.page.html',
  styleUrls: ['./acerca.page.scss'],
})
export class AcercaPage implements OnInit {
 // private loginService :  LoginService ;
  private version : string;
 public usuarioActual: any;

public empresa : any;



  constructor(public navCtrl: NavController) {
    //this.loginService = LoginService.getInstance();
    this.version = Configuraciones.version;
   }
   ionViewDidLoad() {
    console.log('ionViewDidLoad AcercaPage');
  }

  public getLogoEmpresa() : string {

    return "http://www.Cerealnet.com.ar/clientes/movil/logos/"/* + this..cuenta.id.substring(0,2) + ".png"*/ ;
  }

  public getVersionApp():string{
    return this.version;
  }

  public getVersionServicio() : string {
    return '1';
    // return this.loginService.versionServicio;
  }

  public getVersionLib():string{
    return '1'
    //return this.loginService.versionCerealnet;
  }

  public openKernelPage():void{
    //const kernelBrowser = this.inAppBrowser.create("http://www.kernelinformatica.com.ar", "_system");
    //kernelBrowser.show();
  }
  ngOnInit() {

    const objUsuarioActual = localStorage.getItem('usuarioActual');
    if (objUsuarioActual) {
      this.usuarioActual = JSON.parse(objUsuarioActual);
      this.empresa = this.usuarioActual.empresa


    }
  }


}

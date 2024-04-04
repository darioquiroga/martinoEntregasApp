
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, MenuController } from '@ionic/angular';
import { Login } from 'src/app/modelo/login';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { InterceptorService } from './../../services/interceptor.service';
import { textos } from 'src/app/shared/textos/textos';
import { tipoSesion } from '../../shared/constants/tipoSesion';
import { Configuraciones }  from '../../shared/constants/configuraciones';
import { MensajeriaService } from 'src/app/services/mensajeria.service';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public rememberMe = false;
  showPassword: boolean = false;
  passwordToggleIcon: string = 'eye';
  loginForm: FormGroup;
  isAlertOpen = false;
  public alertButtons = ['OK'];
  testError: string | null = "";
  errorLoginMsg: string | null = "";
  errorLoginTitle: string | null = "";
  errorLoginSubTitle: string | null = "";
  appVersion : String | null = "";
  appUrl : String | null = "";
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';
  iconcuenta = 'person';
  nombreEmpresa : string | null = "";
  emailEmpresa  : string | null = "";
  direccionEmpresa  : string | null = "";
  telefonoEmpresa  : string | null = "";
  public registerCredentials = { usuario: '', clave: '' };  // Usado para el inicio de sesion

  @ViewChild('passwordEyeRegister') passwordEye: any;

  constructor(private uiService: UiService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private navController: NavController,
    private activateRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,
    private mensajeriaService: MensajeriaService,
    private interceptorService: InterceptorService,


  ) {
    this.testError = this.activateRoute.snapshot.queryParamMap.get("refreshToken");
    this.loginForm = this.formBuilder.group({
      usuario: ["", [Validators.required]],
      clave: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.menuCtrl.enable(false)
    this.appVersion = Configuraciones.version;
    this.appUrl = Configuraciones.urlBase;
    this.nombreEmpresa =textos.login.html.cerealnet.nombre;
    this.emailEmpresa = textos.login.html.cerealnet.mail;
    this.direccionEmpresa = textos.login.html.cerealnet.direccion;
    this.telefonoEmpresa = textos.login.html.cerealnet.telefono;

    this.doLoadLogin();
    this.traerConfiguracionDelTelefono();
  }
  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.setFocus();
}
  get isValidForm() { return true; }

  showHidePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
  traerConfiguracionDelTelefono (){
    //TelephonyManager telephonyManager = (TelephonyManager)
    //getSystemService(Context.TELEPHONY_SERVICE);
  }


  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  /**
   * Login de usuario
   */
  async loginUser(tipo: string) {


    const login = this.buildInterfaceLogin(this.loginForm.value);
    if (login.usuario == '' && tipo === tipoSesion.NORMAL) {
      this.uiService.presentAlertInfo('Por favor ingrese eL usuario y la contraseña');
      return;
    }

    await this.uiService.presentLoading("Espere...");
    if (tipo === tipoSesion.NORMAL){
      // Si no es camionero, entonces me logueo

   await this.loginService.loginUser(login, this.rememberMe).then(

      async (resp : any) => {
        const respuesta = resp;

        if (resp == true) {

          await this.loadingController.dismiss();
          this.navController.navigateRoot('/resumen', { animated: false });

        } else {

          await this.loadingController.dismiss();
          this.uiService.presentAlertInfo("El usuario o clave ingresados no son correctos, verifique sus datos e intente nuevamente.");

      }
    }
    ).catch(
      async error => {
        this.uiService.presentAlertInfo(error+" Parece que el servcio no esta disponible por el momento, sepa disculpar las molestias e intente nuevamente más tarde.");
        await this.loadingController.dismiss();
      }
    );
    }else{

    }
  }

enviarMensajeWhatsUp(){
  //this.mensajeriaService.enviarMensajeWhatsUWapi("ESTES ES EL MENSAJE WHATS UP");

}


  async doLoadLogin() {


    await this.uiService.presentLoading("Ingresando...");

      this.loginService.trySavedLogin().then(
        async returnValue => {
          //Si hay login guardado.
          await this.loadingController.dismiss();

          if (returnValue == true) {
           //Redirijo al resumen
           setTimeout(() =>{
            console.log("Redirigiendo al resumen...");
            this.navController.navigateRoot('/resumen', { animated: true });

           }, 2000);



          } else {
            // Redirijo al login
            this.navController.navigateRoot('/login', { animated: true });
          }

          console.log(returnValue);
        },
        (error: any) => {
           this.loadingController.dismiss();
          console.log(error);
          this.navController.navigateRoot('/login', { animated: true });
        }
      )

  }

 soyCamionero(){

   this.navController.navigateRoot('/buscar-camion', { animated: true });
  }

  /**
  * Este metodo se usa para la recuperacion de contraseñas
  */
  async recuperarClave() {

    const login = this.buildInterfaceLogin(this.loginForm.value);
    if (login.usuario == '') {
      this.uiService.presentAlertInfo('Por favor ingrese su usuario para la recuperación de clave');
      return;
    }

    await this.uiService.presentLoading("Cargando...");
    this.loginService.recuperarClave(login)
      .then(
        async (resp: any) => {
          await this.loadingController.dismiss();
          if (resp) {
            console.log(resp.email);
            this.uiService.presentAlertInfo(`Recuperación realizada con éxito. Un email fue enviado a: ${ resp.email }`);
          }
        }
      ).catch(
        async error => {
          await this.loadingController.dismiss();
          this.uiService.presentAlertInfo(error);
        }
      );
  }

  private buildInterfaceLogin(loginFrom: any): Login {
    const login: Login = {
      usuario: loginFrom.usuario,
      clave: loginFrom.clave,
    };
    return login;
  }
















}


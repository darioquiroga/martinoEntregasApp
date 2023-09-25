import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  testError: string | null = "";
  errorLoginMsg: string | null = "";
  errorLoginTitle: string | null = "";
  errorLoginSubTitle: string | null = "";
  CerealnetVersion : String | null = "";
  CerealnetUrl : String | null = "";
  constructor(
    private navController: NavController,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loginService.deleteStorage();
   this.logout();
   


  }

  public logout() {
   this.loginService.logout();
    // Seteo la pagina a donde debe ir
   
    this.navController.navigateRoot('/login', { animated: true });
    

  }

}

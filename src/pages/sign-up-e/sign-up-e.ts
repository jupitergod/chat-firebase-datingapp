import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SignEmailPage } from '../sign-email/sign-email';
import { FirstproviderProvider } from '../../providers/firstprovider/firstprovider'
// import $ from 'jquery';
/**
 * Generated class for the SignUpEPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up-e',
  templateUrl: 'sign-up-e.html',
})
export class SignUpEPage {
  userData = {"email":"", "password":"","birthday":"", "status":""};

  yeCheck:boolean;
  noCheck:boolean;

  eyeclasshide:boolean;
  pass_input_mode:string;
  public icon_color:any;

  check_email:boolean;
  check_pass:boolean;
  email:string;
  password:string;
  birthday:any;
  iamover18:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, 
    public user_provid: FirstproviderProvider, public toastCtrl: ToastController) {
    this.yeCheck = true;
    this.noCheck = false;
    this.eyeclasshide = true;
    this.check_email = false;
    this.check_pass = false;
    this.pass_input_mode = 'password';
    this.birthday = 'yet';
    this.iamover18 = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpEPage');
    this.icon_color = 'light';
  }
  email_validate(){
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    if(!pattern.test(this.email))
    {
      this.check_email = false;
    }​
    else
      {
        this.check_email = true;
      }
  }
  pass_validate(){
    if(this.password.length > 4)
    {
      this.check_pass = true;
    }
    else{
      this.check_pass = false;
    }  
  }
  val_pass_showing(){

    // $('#eye-state').css('color', 'blue');
    // $('#eye-state').addClass("eye-class-show");
    // $('#eye-state').removeClass("eye-class-hide");

    if( this.eyeclasshide){
      // $('#eye-state').addClass("eye-class-show");
      // $('#eye-state').removeClass("eye-class-hide");
      this.icon_color = 'dissable'
      this.pass_input_mode = 'text';
      this.eyeclasshide = !this.eyeclasshide;

    } else {
      // $('#eye-state').addClass("eye-class-hide");
      // $('#eye-state').removeClass("eye-class-show");

      this.icon_color = 'light'
      this.eyeclasshide = !this.eyeclasshide;
      this.pass_input_mode = 'password';
    }

  }
  Return(){
    
    this.navCtrl.pop();
  }
  SignUpE(){

    if(this.yeCheck){
      if(this.birthday == 'yet' || !this.check_pass || !this.check_email){
        let toast = this.toastCtrl.create({
            message:"Please insert user info correctly",
            duration:2000
          })
          toast.present();
      } else {
        let loading = this.loadingCtrl.create({
           content: "Please Wait..."
        });
        loading.present();
        let status = "register";
        this.userData.status = status;
        this.userData.email = this.email;
        this.userData.password = this.password;
        this.userData.birthday = this.birthday;
      
        this.user_provid.postAdminData(this.userData).then((result) =>{
          loading.dismiss();
  
          if(Object(result).status=="success"){
            this.navCtrl.push(SignEmailPage);
          } else {
              let toast = this.toastCtrl.create({
                message:"Invalid Username or Password",
                duration:2000
              })
              toast.present();
            };    
        }, (err) => {
          let toast = this.toastCtrl.create({
            message:"No Network",
            duration:2000
          })
          toast.present();
          loading.dismiss();
        });

      }
      
      

    }

  }

  checkChange1(){
    if(this.yeCheck){
      this.noCheck=false;
      this.iamover18 = true;
    }
    else{
      this.noCheck=true;  
      this.iamover18 = false;
    }
  }
  checkChange2(){
    if(this.noCheck)
      this.yeCheck=false;
    else
      this.yeCheck=true;  
    this.iamover18 =  !this.noCheck;
  }
}

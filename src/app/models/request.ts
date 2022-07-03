import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { environment } from "src/environments/environment";

export class SouscriptionModel {
    public id: string | undefined;
    public duree: string | undefined;
    public periodicite: string | undefined;
    public order: string | undefined;
    public montant: string | undefined;
    public frozen: string | undefined;
    public client_id: string | undefined;
    public type_souscription_id: string | undefined;
    public created_at: string | undefined;
    public updated_at: string | undefined;
  }

export class GroupeModel {
  public id: string | undefined;
  public id_souscription: string | undefined;
  public code: string | undefined;
  public montant: string | undefined;
  public numero: string | undefined;
  public role: string | undefined;
  public ordre: string | undefined;
  public ordrearriver: string | undefined;
  public periodicite: string | undefined;
  public status: string | undefined;
  public created_at: string | undefined;
  public updated_at: string | undefined;
}

export class User{
    static nom: string | undefined;
    static prenom: string | undefined;
    static numero: string | undefined;
    static email: string | undefined;
    static password: string | undefined;
   static updated_at: string | undefined;
  static verifier = false;
}

export class variablelocale{
  /*pour marchand*/
    static numeropourdepot = "";
    static souscription: any;
    static operation = "";
    static user = "";

  static toggleControl = new FormControl(false);
  /***************/
  static user_url = environment.url
  static souscription_url = environment.url
  static operation_url = environment.url

  static notification = 0;
  //static toggleControl: any;


  static notificationCount(http: HttpClient):any{
    
    http.post(`${variablelocale.souscription_url}/api/liste_modif_ramassage`, {
      phoneNumber: "+229"+localStorage.getItem('phone'),
    })
    .subscribe((res: any) => {
      if (res.data && res.data.length != 0){
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].statut=='Attente'){
            this.notification = this.notification + 1
          }
        }
      }
    });
  }
}

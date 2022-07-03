import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { variablelocale } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  variablelocale = variablelocale;

  constructor(private httpClient: HttpClient) {}

  public liste(){
    return this.getRequest(this.variablelocale.souscription_url+'/api/client_souscription?client_id=19')
    .subscribe(res => { 
      return res.body.data;
    });
  }

  public getRequest(url: string){   
    return this.httpClient
    .get<any>(url, { observe: 'response' })
    .pipe(tap(res => {
      return res;
    }));
  }

  public depot(url: string){   
    return this.httpClient
    .get<any>(url, { observe: 'response' })
    .pipe(tap(res => {
      return res;
    }));
  }

}

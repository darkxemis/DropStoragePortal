import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiConstants } from '../../logic/constants/api.constants';
import { AppConfig } from '../../app.configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly DateTimeFormat = 'DD/MM/YYYY HH:mm:ss';

  constructor(private http: HttpClient) { }

  private formatErrors(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 0) {
      return throwError('Http connection error');
    }
    else {
      const error = errorResponse.error;
      return throwError(error);
    }
  }

  private createHttpParams(props: object): HttpParams {
    const params = {};

    Object.keys(props)
    .forEach((key) => {
      params[key] = props[key];
    });

    return new HttpParams({ fromObject: params });
  }

  private jsonHeaders() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }
  
  public async authToken(username: string, password: string): Promise<any> {
    const path = ApiConstants.pathAuthToken;
    const data = 'username=' + username + '&password=' + password;
    
    return await this.http.post(
      `${AppConfig.settings.webApi.url}${path}`,
      data,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).pipe(catchError(this.formatErrors)).toPromise();
  }

  /*public async authRefreshToken(token: string, refreshToken: string): Promise<any> {
    const path = ApiConstants.pathAuthRefreshToken;
    const data: Auth  = { access_token: token, refresh_token: refreshToken } as Auth;

    return await this.http.post(
      `${AppConfig.settings.webApi.url}${path}`,
      this.stringify(data),
      { headers: this.jsonHeaders() }
    ).pipe(catchError(this.formatErrors)).toPromise();
  }*/

  public async get(path: string, params: object = {}): Promise<any> {
    const parameters: HttpParams = this.createHttpParams(params);
    return await this.http.get(`${AppConfig.settings.webApi.url}${path}`,
      {
        params: parameters,
        headers: this.jsonHeaders()
      })
      .pipe(catchError(this.formatErrors)).toPromise();
  }

  public async delete(path: string, body: object = {}): Promise<any> {
    const parameters: HttpParams = this.createHttpParams(body);

    return await this.http.delete(
      `${AppConfig.settings.webApi.url}${path}`,
      { headers: this.jsonHeaders(), params: parameters}
    ).pipe(catchError(this.formatErrors)).toPromise();
  }

  public async put(path: string, body: object = {}): Promise<any> {
    return await this.http.put(
      `${AppConfig.settings.webApi.url}${path}`,
      this.stringify(body),
      { headers: this.jsonHeaders() }
    ).pipe(catchError(this.formatErrors)).toPromise();
  }

  public async post(path: string, body: object = {}): Promise<any> {
    return await this.http.post(
      `${AppConfig.settings.webApi.url}${path}`,
      this.stringify(body),
      { headers: this.jsonHeaders() }
    ).pipe(catchError(this.formatErrors)).toPromise();
  }

  private stringify(body: any): string {
    const sendBody: any = this.stringifyConvert(body);
    const result: string = JSON.stringify(sendBody);
    return result;
  }

  private stringifyConvert(body: any): any{
    if (body === null || body === undefined ) {
      return body;
    }
    if (typeof body !== 'object' ){
      return body;
    }
    
    let result: Array<any> | object = null;
    if (Array.isArray(body)){
      result = [];
    }
    else {
      result = {};
    }
    
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (typeof value === 'object') {
        result[key] = this.stringifyConvert(value);
      }
      else {
        result[key] = value;
      }
    }
    return result;
  }
  
  public async getFile(path: string, body: object = {}): Promise<any> {
    //const parameters: HttpParams = this.createHttpParams(params);
    return await this.http.post(`${AppConfig.settings.webApi.url}${path}`, this.stringify(body),
        {
          headers: this.jsonHeaders(),
          //params: parameters,
         
          responseType: 'blob'
        })
      .pipe(catchError(this.formatErrors)).toPromise();
  }

  async uploadFile(path: string, file: any) : Promise<any>{
    const formData = new FormData();
    const fileToUpload = file as File;
    formData.append('file', fileToUpload, fileToUpload.name);
    return await this.http.post(`${AppConfig.settings.webApi.url}${path}`, formData).pipe(catchError(this.formatErrors)).toPromise();
  }
  
}

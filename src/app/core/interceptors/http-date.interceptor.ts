import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import FormatDate from "src/app/shared/utils/format.date.util";

@Injectable()
export class HttpDateInterceptor implements HttpInterceptor {

  private format = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/; // dd/MM/yyyy HH:mm:ss

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        this.convertToDate(body);
      }
      return event;
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
        }
      }
    }));
  }

  convertToDate(body) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      
      if (this.isDateString(value)) {
        const date = moment(value, 'DD/MM/yyyy HH:mm:ss').toDate();
        const dateFormated = FormatDate.FormatDate(date, FormatDate.format2);
        body[key] = dateFormated;
      } else if (typeof value === 'object') {
        this.convertToDate(value);
      }
    }
  }

  isDateString(value) {
    if (value === null || value === undefined) {
      return false;
    }

    if(typeof value === "string") 
    {
        return this.format.test(value);
    }
    return false;
  }
}


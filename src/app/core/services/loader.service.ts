import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class LoaderService {

    private isLoadingSubject = new ReplaySubject<boolean>(1);
    isLoading = this.isLoadingSubject.asObservable();
    
    constructor() { }

    show() {
        this.isLoadingSubject.next(true);
    }

    hide() {
        this.isLoadingSubject.next(false);
    }

  }
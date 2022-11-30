import { Component, OnInit } from '@angular/core';
import { AppConfig } from './app.configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DropStoragePortal';
  constructor() {}
  public ngOnInit(): void {
    if (AppConfig.settings.config.production) {
      if(window) {
        window.console.log=function(){};
      }
    }
  }
}

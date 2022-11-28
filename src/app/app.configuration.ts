import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/

export interface IAppSettings {
    env: {
        name: string;
    };

    webApi: {
        url: string;
    };

    config: {
        production: boolean;
        hideConsole: boolean;
    };
}

@Injectable()
export class AppConfig {
    static settings: IAppSettings;
    constructor(private http: HttpClient) {}
    load() {
        const jsonFile = `assets/config/config.${environment.name}.json`;

        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response : IAppSettings) => {
               AppConfig.settings = <IAppSettings>response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { DBService } from './providers/db.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private dbService: DBService
  ) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);
    if (electronService.isElectron()) {
      this.dbService.initDb();
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}

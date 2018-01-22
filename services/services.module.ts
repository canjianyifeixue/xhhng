import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { MatSnackBarModule } from '@angular/material';
import { CovalentDialogsModule } from '@covalent/core';

import { HttpService } from './http.service';
import { AuthHttpService } from './auth-http.service';
import { HttpUtilService } from './http-util.service';
import { NotificationService } from './notification.service';
import { ToolService } from './tool.service';

@NgModule({
  imports: [
    HttpModule,
    MatSnackBarModule,
    CovalentDialogsModule,
  ]
})
export class MhServicesModule {
  static forRoot(
    getApi: () => string,
    authError: (err: Response) => void,
    getToken: () => string,
  ): ModuleWithProviders {
    return {
      ngModule: MhServicesModule,
      providers: [
        { provide: 'api', useFactory: getApi },
        { provide: 'token', useFactory: getToken },
        { provide: 'authError', useValue: authError },
        HttpService,
        AuthHttpService,
        HttpUtilService,
        NotificationService,
        ToolService,
      ]
    };
  }
}

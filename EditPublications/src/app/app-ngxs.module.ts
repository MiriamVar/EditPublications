import { NgModule } from '@angular/core';
import { NgxsModule}from '@ngxs/store';
import { NgxsLoggerPluginModule }from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule }from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { environment } from 'src/environments/environment';
import { AuthState } from 'src/shared/auth.state';

const states = [AuthState];

@NgModule({
  declarations: [],
  imports: [NgxsModule.forRoot(states,{
    developmentMode: !environment.production,
    selectorOptions: {
      suppressErrors: false,
      injectContainerState: false
    }
  }),
  NgxsStoragePluginModule.forRoot({
    key: ['auth.username', 'auth.token']
  }
  ),
  NgxsLoggerPluginModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot()
],
  exports: [NgxsModule, NgxsLoggerPluginModule, NgxsReduxDevtoolsPluginModule]
})
export class AppNgxsModule { }

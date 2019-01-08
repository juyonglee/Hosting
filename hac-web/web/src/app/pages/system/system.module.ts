import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {DustRegisterComponent} from './dust-register/dust-register.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { NetworkComponent } from './network/network.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DustInfoComponent } from './dust-register/dust-info/dust-info.component';
import {UserinfoComponent} from '../admin/user/userinfo/userinfo.component';
import {CompanyInfoComponent} from '../admin/company/company-info/company-info.component';
import { LocationInfoComponent } from './dust-register/location-info/location-info.component';

export const routes = [
    { path: 'dust-register', component: DustRegisterComponent, data: { breadcrumb: '장비등록 및 배치' } },
    { path: 'monitoring', component: MonitoringComponent, data: { breadcrumb: '모니터링 및 설정' } },
    { path: 'network', component: NetworkComponent, data: { breadcrumb: '네트워크' } },
];

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      RouterModule.forChild(routes),
      NgxDatatableModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule
  ],
    declarations: [
        DustRegisterComponent,
        MonitoringComponent,
        NetworkComponent,
        DustInfoComponent,
        LocationInfoComponent
    ],
    entryComponents:[
        DustInfoComponent,
        LocationInfoComponent
    ],
    providers: [
    ]
})
export class SystemModule { }

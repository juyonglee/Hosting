import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DustService} from '../system/dust-register/dust.service';
import {Dust} from '../system/dust-register/dust.model';
import {DustClientService} from './dust-client.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-typea',
  templateUrl: './typea.component.html',
  styleUrls: ['./typea.component.scss'],
    providers: [ DustService, DustClientService]
})
export class TypeaComponent implements OnInit, OnDestroy {

    public dusts: Dust[];
    messages = [];
    paramDustName: any;
    connection;
    message = 'hello';
    paramData: any = [];
    pushParamData: any = [];
    deviceData: any;
    originalData: any;
    s_structData: any;
    r_structData: any;
    isViewConfig: boolean;

    m_wAuto_puls_val: any = 0; // 차압
    m_wPower_value: any = 0; // 전압
    m_waCurrent_nowx10: any = 0; // 전류
    m_byReserved: any = 0; // 인버터
    m_fParam_power: any = 0; // 전력
    m_wParam_runtime: any = 0; // 가동시간
    m_byType: any = 0; // 0, PULS 타입 1 :SHAKE타입

    constructor(public dustService: DustService,
              public dustClientService: DustClientService) { }

  ngOnInit() {
      this.isViewConfig = false;
      this.getDusts();
      console.log('Logic call');
      this.connection = this.dustClientService.getMessages().subscribe(data => {
          if(data) {
              this.paramData =  data;
              this.paramData = JSON.parse(JSON.stringify(JSON.parse(this.paramData)));
              this.m_wAuto_puls_val = [];
              this.m_wPower_value = [];
              this.m_waCurrent_nowx10 = [];
              this.m_byReserved = [];
              this.m_fParam_power = [];
              this.m_wParam_runtime = [];
              this.m_byType = [];

              for(var i=0; i<this.paramData.length; i++) {
                  this.deviceData = JSON.parse(JSON.stringify(this.paramData[i])).data;
                  console.log('this.deviceData================>>>>>');
                  console.log(this.deviceData);
                  this.originalData = JSON.parse(JSON.stringify(this.deviceData)).bufferData;

                  this.r_structData = JSON.parse(this.originalData)['m_stRunParam'];
                  this.s_structData = JSON.parse(this.originalData)['m_stSysParam'];

                  this.m_wAuto_puls_val.push(JSON.parse(JSON.stringify(this.r_structData))['m_wAuto_puls_val']);
                  this.m_wPower_value.push(JSON.parse(JSON.stringify(this.s_structData))['m_wPower_value']);

                  this.m_waCurrent_nowx10.push(JSON.parse(this.originalData)['m_byReserved'][0]);
                  this.m_byReserved.push(JSON.parse(this.originalData)['m_byReserved'][3]);
                  this.m_fParam_power.push(JSON.parse(this.originalData)['m_fParam_power']);
                  this.m_wParam_runtime.push(JSON.parse(this.originalData)['m_wParam_runtime']);
                  this.m_byType.push(JSON.parse(JSON.stringify(this.s_structData))['m_byType']);
              }
              //this.sendMessage();
          }
      });

  }

  sendMessage() {
      this.dustClientService.sendMessage(this.message);
      this.message = '';
  }

  public getDusts(): void {
      this.dusts = null; //for show spinner each time
      this.dustService.getDusts().subscribe(dusts => {
          this.dusts = dusts;
        });
  }

  ngOnDestroy() {
      this.connection.unsubscribe();
  }

  goDustConfig(param, dustName) {
    if(param) {
        this.pushParamData = param;
        this.paramDustName = dustName;
        this.isViewConfig = true;
    }
  }

    backDustConfig(e) {
        if (!e) {
            this.isViewConfig = false;
        }
    }
}

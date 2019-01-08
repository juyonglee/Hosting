import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dust} from '../system/dust-register/dust.model';
import {DustService} from '../system/dust-register/dust.service';
import {DustClientService} from '../typea/dust-client.service';

@Component({
  selector: 'app-typeb',
  templateUrl: './typeb.component.html',
  styleUrls: ['./typeb.component.scss'],
    providers: [ DustService, DustClientService]
})
export class TypebComponent implements OnInit, OnDestroy {

    public dusts: Dust[];
    messages = [];
    connection;
    message = 'hello';
    paramData: any = {};

    deviceData: any;
    originalData: any;
    s_structData: any;
    r_structData: any;

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
      this.getDusts();
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

                  // console.log(JSON.parse(this.originalData)['m_wM_status']);
                  // console.log(this.m_wAuto_puls_val[i]);
                  // console.log(this.m_wPower_value[i]);
                  // console.log(JSON.parse(this.originalData)['m_waCurrent_nowx10'][0]);
                  // console.log(JSON.parse(this.originalData)['m_byReserved'][3]); // m_byReserved[3]
                  //console.log(JSON.parse(originalData)['m_byStart']);
                  //console.log(JSON.parse(JSON.stringify(this.s_structData))['m_wAuto_puls_val']);
                  //console.log(JSON.parse(JSON.stringify(this.r_structData))['m_wPower_value']);
              }
              //this.sendMessage();
          }
          // m_waCurrent_nowx10
          /*for(let i = 0; i < this.paramData.m_waCurrent_nowx10.length; i++) {
              if(this.paramData.m_waCurrent_nowx10[i] > 0) {
                  this.m_waCurrent_nowx10 = (this.paramData.m_waCurrent_nowx10[i] / 10);
              }
          }*/
      });
      //this.sendMessage();
  }

    sendMessage() {
        this.dustClientService.sendMessage(this.message);
        this.message = '';
    }

    public getDusts(): void {
        this.dusts = null; //for show spinner each time
        this.dustService.getDusts().subscribe(dusts => {
            this.dusts = dusts;
            console.log(this.dusts);
            /*this.dustClientService.getClient().subscribe(d =>{
              console.log('ddddd=>',d);
            });*/
        });
    }

    ngOnDestroy() {
        //this.connection.unsubscribe();
    }

}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {Dust} from '../dust.model';
import {DustLocationService} from '../dust-location.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss'],
    providers: [ DustLocationService ]
})
export class LocationInfoComponent implements OnInit {
    public form: FormGroup;
    locations: any[] = [];
    selectedLocation: any;
  constructor(public dialogRef: MatDialogRef<LocationInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public dust: Dust,
              public fb: FormBuilder,
              public dustLocationService: DustLocationService) {
      this.form = this.fb.group({
          id: null,
          locationID: null,
          dustIPAddress: [null, Validators.compose([Validators.required])],
          version: null,
          dustType: null,
          dustName: null,
          isActive: 0
      });
  }

  getDustLocations() {
      this.dustLocationService.getLocations().subscribe(dustLocations => {
          dustLocations.forEach((x) => {
              this.locations.push({
                  id: x.id,
                  text: x.location
              });
          });
      });
  }

  selectedDustLocations() {
      this.selectedLocation = _.find(this.locations, { 'id': this.form.controls['locationID'].value }).text;
  }

  ngOnInit() {
      this.getDustLocations();
      if (this.dust) {
          this.form.controls['locationID'].setValue(this.dust.locationID);
          this.selectedLocation = this.dust.locationID;
          this.form.controls['dustIPAddress'].setValue(this.dust.dustIPAddress);
          this.form.controls['dustType'].setValue(this.dust.dustType);
          this.form.controls['dustName'].setValue(this.dust.dustName);
          this.form.controls['version'].setValue(this.dust.version);
          this.form.controls['isActive'].setValue(this.dust.isActive);
      }
      else {
          this.dust = new Dust();
      }
  }
    close(): void {
        this.dialogRef.close();
    }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogModule, Dialog } from 'primeng/dialog';
import { ApiService } from '@api/api.service';
import { SelectFlatModalComponent } from '../select-flat-modal/select-flat-modal.component';

enum STEPS {
  DESCRIPTION = 'description',
  CONFIGURATION = 'configuration',
}
@Component({
  selector: 'configurator-my-flat',
  templateUrl: './my-flat.component.html',
  styleUrls: ['./my-flat.component.scss'],
})
export class MyFlatComponent {
  public visible: boolean = false;
  public searchValue: string = '';
  public apartmentFilterForm: FormGroup;
  public settingsForm: FormGroup;
  public currentStep = STEPS.DESCRIPTION;
  public steps = STEPS;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.apiService.getListComplexes().subscribe();
    this.apartmentFilterForm = this.fb.group({
      roomsCnt: ['', [Validators.required]],
      areaTotalFrom: ['', [Validators.required]],
      areaTotalTo: ['', [Validators.required]],
    });

    this.settingsForm = this.fb.group({
      roomsCount: ['', [Validators.required]],
      totalArea: ['', [Validators.required]],
      ceilingHeight: ['', [Validators.required]],
      bathroomType: ['', [Validators.required]],
      bathroomArea: ['', [Validators.required]],
      finishingСondition: ['', [Validators.required]],
    });
  }

  public manualSettings(): void {
    this.currentStep = STEPS.CONFIGURATION;
  }

  public selectApartment() {
    this.visible = true;
  }

  public closeModal() {
    this.visible = false;
  }

  public sendData() {
    return;
  }
}

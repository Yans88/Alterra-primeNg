import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CrudRoutingModule} from './crud-routing.module';
import {ListDataComponent} from './list-data/list-data.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {RippleModule} from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {SkeletonModule} from 'primeng/skeleton';
import {FormAddComponent} from './form-add/form-add.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ListDataComponent, FormAddComponent],
  imports: [
    CommonModule,
    TableModule,
    CrudRoutingModule,
    ButtonModule,
    ConfirmPopupModule,
    RippleModule,
    ToastModule,
    ConfirmDialogModule,
    SkeletonModule,
    FormsModule,
    InputTextModule,
  ],
})
export class CrudModule {
}

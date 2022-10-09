import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAddComponent } from './form-add/form-add.component';
import { ListDataComponent } from './list-data/list-data.component';

const routes: Routes = [
  {
    path: '',
    component: ListDataComponent,
  },
  {
    path: 'add',
    component: FormAddComponent,
  },
  {
    path: 'add/:id_provinsi/:nama_provinsi',
    component: FormAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudRoutingModule {}

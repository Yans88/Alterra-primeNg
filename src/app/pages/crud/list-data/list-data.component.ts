import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrudService } from '../crud.service';
import { IProvinsiModel } from '../models/crud.model';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ListDataComponent implements OnInit {
  items!: IProvinsiModel[];
  isLoading: boolean = true;
  constructor(
    private crudService: CrudService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.crudService.getData().then((res) => {
      this.items = res;
      this.isLoading = false;
    });
  }

  addData() {}

  onDelete(id: number, event: Event): void {
    this.confirmationService.confirm({
      key: 'confirm_' + id,
      target: event.target || new EventTarget(),
      message: 'Are you sure that you want to delete it?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.crudService.deleteData(id);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have delete it',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected this process',
        });
      },
    });
  }
}

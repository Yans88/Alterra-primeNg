import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CrudService} from '../crud.service';
import {IDataResponse} from '../models/crud.model';
import {Subject, takeUntil} from "rxjs";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ListDataComponent implements OnInit, OnDestroy {
  items!: IDataResponse;
  isLoading: boolean = true;

  private unsubcribe$ = new Subject();

  constructor(
    private crudService: CrudService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }


  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    this.unsubcribe$.next(true);
    this.unsubcribe$.complete();
  }

  getData() {
    this.isLoading = false;
    this.crudService.getData().pipe(takeUntil(this.unsubcribe$)).subscribe((res: IDataResponse) => {
      this.items = res;

    });
    //this.items$=this.crudService.getData();

  }

  addData() {
    Swal.fire({
      icon: 'error',
      title: 'Internal Service Error',
      text: 'ooo',
    });
  }

  onDelete(id: number, event: Event): void {
    //console.log(id);
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

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {CrudService} from '../crud.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss'],
  providers: [MessageService],
})
export class FormAddComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  id_provinsi?: number;
  nama_provinsi?: string;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.id_provinsi = this.route.snapshot.params['id_provinsi'];
    this.nama_provinsi = this.route.snapshot.params['nama_provinsi'];
  }

  addData(): void {
    this.isLoading = true;
    const body = {
      id_provinsi: this.id_provinsi ? this.id_provinsi : 0,
      nama_provinsi: this.nama_provinsi,
    };
    this.crudService.postData(body).subscribe(
      (res) => {
        if (res.err_code === '00') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Data sudah direcord',
          });
          setTimeout(() => {
            this.router.navigateByUrl(`pages/crud`);
          }, 1300);
        }
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  back(): void {
    this.router.navigateByUrl('pages/crud');
  }
}

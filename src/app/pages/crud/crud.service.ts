import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProvinsiModel } from './models/crud.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  urlApi: string = environment.endpoint.crudAPI;
  constructor(private httpClient: HttpClient) {}
  httpOptions: any;
  getData() {
    return this.httpClient
      .post<any>(this.urlApi + '/provinsi', this.httpOptions)
      .toPromise()
      .then((res) => <IProvinsiModel[]>res.data)
      .then((data) => {
        return data;
      });
  }

  deleteData(id: number): void {
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    let body: any = { id_provinsi: id, operator_by: 1 };
    this.httpClient.post(this.urlApi + '/del_provinsi', body, headerOption);
  }

  postData(body: any) {
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post<any>(
      this.urlApi + '/simpan_provinsi',
      body,
      headerOption
    );
  }
}

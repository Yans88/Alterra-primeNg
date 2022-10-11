export interface IProvinsiModel {
  id_provinsi: number;
  nama_provinsi: string;
}

export interface IDataResponse {
  err_code: string,
  err_msg: string,
  total_data: number,
  data: IProvinsiModel[];
}

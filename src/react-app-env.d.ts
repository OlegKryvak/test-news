/// <reference types="react-scripts" />

interface IAllNewsResponse {
  data: INews[] | string;
  config: any;
  headers: any;
  request: any;
  status: any;
  statusText: any;
}

interface INews {
  title: string;
  author: string;
  id: number;
  description: string;
  img: string;
}

interface ICurrencyInfo {
  timestamp: number;
  rate: number;
}

interface ICurrencyQueries {
  from: string;
  to: string;
  amount: number;
  date: null | string;
}

interface ICurrencyData {
  date: string;
  info: ICurrencyInfo;
  query: ICurrencyQueries;
  result: number;
  success: true;
}

interface ICurrencyResponse {
  data: ICurrencyData;
  config: any;
  headers: any;
  request: any;
  status: any;
  statusText: any;
}

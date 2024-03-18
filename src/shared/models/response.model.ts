export interface Response {
  title: string;
  status: number;
  message: string;
  result: any;
}

export interface ResponsePagination {
  title: string;
  status: number;
  message: string;
  result: {
    data: any[];
    hasReachMax: boolean;
    recordsTotal: number;
  };
}

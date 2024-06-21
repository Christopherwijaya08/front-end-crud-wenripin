export class StudentModel{
    name: string;
    phone: string;
    address: string;
    _id: string;
    studentStatus: string;

    constructor(data: any = {}){
        this.name = data.name || null;
        this.phone = data.phone || null;
        this.address = data.address || null;
        this._id = data._id || null;
        this.studentStatus = data.studentStatus || null;
    }
}

export class studentPagingModel {
    pageSize: number;
    pageNumber: number;
    sortColumn: string;
    sortOrder: string;

    constructor (data:any = {}){
        this.pageSize = data.pageSize || 5;
        this.sortColumn = data.sortColumn || '_id';
        this.sortOrder = data.sortOrder || 'desc';
        this.pageNumber = data.pageNumber || 0;
    }
}
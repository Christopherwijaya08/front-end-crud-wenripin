export class StudentModel{
    name: string;
    phone: string;
    address: string;
    _id: string;

    constructor(data: any = {}){
        this.name = data.name || null;
        this.phone = data.phone || null;
        this.address = data.address || null;
        this._id = data._id || null;
    }
}

export class studentPagingModel {
    pageSize: number;
    pageNumber: number;
    sortColumn: string;
    sortOrder: string;

    constructor (data:any = {}){
        this.pageSize = data.pageSize || 5;
        this.sortColumn = data.sortColumn || 'name';
        this.sortOrder = data.sortOrder || 'asc';
        this.pageNumber = data.pageNumber || 0;
    }
}
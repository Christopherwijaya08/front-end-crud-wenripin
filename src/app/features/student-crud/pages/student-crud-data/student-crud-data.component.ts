import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StudentCrudDataService } from '../../services/student-crud-data.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { StudentModel, studentPagingModel } from '../../models/student.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalStudentComponent } from '../../components/modal-student/modal-student.component';
import { AlertService } from 'src/shared/services/alert/alert.service';
import { Subject, takeUntil } from 'rxjs';
import { SortChange } from 'src/shared/models/sort.model';

@Component({
  selector: 'app-student-crud-data',
  templateUrl: './student-crud-data.component.html',
  styleUrls: ['./student-crud-data.component.scss'],
})
export class StudentCrudDataComponent implements OnInit {
  public form: FormGroup;
  public ColumnMode = ColumnMode;
  public submitted: boolean = false;
  public pageSize: FormControl = new FormControl(5);
  public pageSizeOptions = [5, 10, 25, 50, 100];

  private _unsubAll: Subject <any> = new Subject();

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    public _studentService: StudentCrudDataService,
    private _modalService: NgbModal,
    private _alertService: AlertService
  ) {
    this.form = this._fb.group(new StudentModel());

    this.addValidators();
  }

  addValidators() {
    this.f['name'].addValidators([Validators.required]);
    this.f['address'].addValidators([Validators.required]);
    this.f['phone'].addValidators([Validators.required]);
  }

  ngOnInit(): void {
    this.loadData();
    this.pageSize.valueChanges.pipe(takeUntil(this._unsubAll)).subscribe((pageSize)=> {
      this.pagingModel.pageSize = pageSize;
      this.pagingModel.pageNumber = 0;
      this.loadData();
    })
  }

  get pagingModel(): studentPagingModel{
    return this._studentService.pagingModel;
  }

  setSort(pageInfo: SortChange){
    const {prop, dir} = pageInfo.sorts[0];
    this.pagingModel.sortColumn = prop;
    this.pagingModel.sortOrder = dir;
    this.pagingModel.pageNumber = 0;
    this.loadData();
  }

  setPage(pageInfo: any){
    this.pagingModel.pageNumber = pageInfo.offset;
    this.loadData();
  }

  get f() {
    return this.form.controls;
  }

  get recordsTotal(): number {
    return this._studentService.recordsTotal;
  }

  checkForm(): boolean {
    this.submitted = true;
    if (this.form.invalid) {
      return false;
    }
    return true;
  }

  

  async save() {
    if (this.checkForm()) {
      try {
        await this._studentService.SaveData(this.form.value);
        this._alertService.Global_Alert(
          null,
          'success',
          'Success!',
          'Employee Added Successfully!'
        ).then(()=>{
          this.form.reset();
          this.loadData();
        });
      } catch (error) {
        this._alertService.Global_Alert(null, 'error', 'Error', error);
      } finally {
        this.submitted = false;
      }
    }
  }

  loadData() {
    this._studentService.GetData();
  }

  openEditModal(row: StudentModel) {
    console.log(row);
    const modal = this._modalService.open(ModalStudentComponent, {
      size: 'lg',
      centered: true,
    });

    modal.componentInstance.parentId = row._id;

    modal.result.finally(() => {
      this.loadData();
    });
  }

  deleteData(row: StudentModel) {
    // console.log(row);
    // const confirmation = confirm('Are you sure to delete this data?');
    // if (confirmation) {
    //   this._studentService
    //     .DeleteData(row._id)
    //     .then(() => {
    //       alert('Data successfully deleted!');
    //       this.loadData();
    //     })
    //     .catch((error) => {
    //       alert('Error: ' + error);
    //     });
    // } else {
    //   alert('Deletion canceled!');
    // }
    this._alertService
      .Global_Confirm(
        null,
        'warning',
        'Are you Sure to delete this data?',
        "Your data won't be recovered",
        'Yes, Delete it!',
        'Cancel'
      )
      .then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          this._studentService
            .DeleteData(row._id)
            .then(() => {
              this._alertService
                .Global_Alert(
                  null,
                  'success',
                  'Success!',
                  'Your data has been Deleted!'
                )
                .then(() => this.loadData());
            })
            .catch((error) => {
              alert('Error: ' + error);
            });
        }
      });
  }
}

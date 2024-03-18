import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentModel } from '../../models/student.model';
import { StudentCrudDataService } from '../../services/student-crud-data.service';
import { AlertService } from 'src/shared/services/alert/alert.service';

@Component({
  selector: 'app-modal-student',
  templateUrl: './modal-student.component.html',
  styleUrls: ['./modal-student.component.scss'],
})
export class ModalStudentComponent implements OnInit {
  public parentId: string = '';
  public editForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private _activeModal: NgbActiveModal,
    private _fb: FormBuilder,
    private _studentService: StudentCrudDataService,
    private _alertService: AlertService
  ) {
    this.editForm = this._fb.group(new StudentModel());
    this.addValidators();
  }

  addValidators(){
    this.f['name'].addValidators([Validators.required]);
    this.f['address'].addValidators([Validators.required]);
    this.f['phone'].addValidators([Validators.required]);
  }

  get f(){
    return this.editForm.controls;
  }

  closeModal() {
    this._activeModal.close();
  }

  async ngOnInit(): Promise<void> {
    await this._studentService
      .GetDataById(this.parentId)
      .then((res) => {
        this.editForm.patchValue(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  checkForm(): boolean {
    this.submitted = true;
    if (this.editForm.invalid){
      return false;
    } 
    return true;
  }

  async editData() {
    if (this.checkForm()){
      try {
        await this._studentService.UpdateData(this.editForm.value);
        this._alertService
          .Global_Alert(null, 'success', 'Success!', 'Your data has been changed')
          .then(() => this.closeModal());
      } catch (error) {
        console.log(error)
        this._alertService.Global_Alert(null, 'error', 'Error', error);
      } finally {
        this.submitted = false;
      }
    }
  }
}

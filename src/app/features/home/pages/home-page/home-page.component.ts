import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/features/register/services/register.service';
import { AlertService } from 'src/shared/services/alert/alert.service';
import { TokenService } from 'src/shared/services/token/token.service';
import { NotesModel } from '../../models/notes.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public username: string;
  public now: string;
  public isoStringDate = new Date().toISOString();
  public form: FormGroup;

  public notes = [];

  public addMode: boolean = true;
  public editMode: boolean = false;

  constructor(
    private _tokenService: TokenService,
    private _registerService: RegisterService,
    private _alertService: AlertService,
    private _router: Router,
    private _datePipe: DatePipe,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group(new NotesModel());
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getDetailUser();
    this.loadData();
    this.now = this._datePipe.transform(
      this.isoStringDate,
      'yyyy-MM-dd HH:mm:ss'
    );
  }

  async loadData() {
    try {
      this.notes = await this._registerService.BrowseNote(this.token);
    } catch (error) {
      this._alertService.Global_Alert(null, 'error', 'Error', error);
    }
  }

  toggleNoteClick(note: NotesModel, index: number) {
    this.editMode = true;
    this.addMode = false;
    this.notes.forEach((note, i) => {
      note.clicked = i === index;
    });

    this.loadDataById(note.id);
  }

  async loadDataById(id: number) {
    try {
      const res = await this._registerService.GetNoteById(id, this.token);
      this.form.patchValue(res);
    } catch (error) {
      this._alertService.Global_Alert(null, 'error', 'Error', error);
    }
  }

  async save() {
    if (!this.f['title'].value && !this.f['content'].value) {
      this._alertService.Global_Alert(
        null,
        'error',
        'Error',
        'Please fill either title or content before saving'
      );
      return;
    }

    try {
      await this._registerService.CreateNote(
        this.form.getRawValue(),
        this.token
      );
      await this._alertService.Global_Alert(
        null,
        'success',
        'Success',
        'Data Anda Berhasil Disimpan'
      );
      this.form.reset();
      this.loadData();
    } catch (error) {
      this._alertService.Global_Alert(null, 'error', 'Error', error);
    }
  }

  async update() {
    try {
      await this._registerService.UpdateNote(
        this.form.getRawValue(),
        this.token
      );
      await this._alertService.Global_Alert(
        null,
        'success',
        'Success',
        'Data Anda Berhasil Disimpan'
      );
      this.form.reset();
      this.loadData();
    } catch (error) {
      this._alertService.Global_Alert(null, 'error', 'Error', error);
    }
  }

  async deleteNote(id: number, event: Event) {
    event.stopPropagation();
    try {
      await this._registerService.DeleteNote(id, this.token);
      await this._alertService.Global_Alert(
        null,
        'success',
        'Success',
        'Data Anda Berhasil Dihapus'
      );
      this.form.reset();
      this.addMode = true;
      this.editMode = false;
      this.loadData();
    } catch (error) {
      this._alertService.Global_Alert(null, 'error', 'Error', error);
    }
  }

  addNote() {
    this.form.reset();
    if (this.editMode) {
      this.editMode = false;
      this.addMode = true;
    }
  }

  get token() {
    return this._tokenService.getToken();
  }

  async logout() {
    try {
      await this._registerService.logout(this.now, this.token);
      await this._alertService.Global_Alert(
        null,
        'success',
        'Success',
        'Logout Berhasil'
      );
      this._tokenService.clearToken();
      this._router.navigateByUrl('login');
    } catch (error) {
      this._alertService.Global_Alert(null, 'error', 'Error', error);
    }
  }

  async getDetailUser() {
    try {
      await this._registerService.GetDetailOfUser(this.token).then((res) => {
        this.username = res.data.username;
        console.log(this.username);
      });
    } catch (error) {
      await this._alertService.Global_Alert(null, 'error', 'Error', error);
      this._router.navigateByUrl('login');
    }
  }
}

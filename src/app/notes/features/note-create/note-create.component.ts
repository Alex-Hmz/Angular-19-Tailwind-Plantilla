import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotesService } from '../../data-access/notes.service';

@Component({
  selector: 'app-note-create',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './note-create.component.html',
  styles: ``
})
export class NoteCreateComponent {
  
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _notesService = inject(NotesService);

  public showMessage: boolean = false;
  public messageAlert: string = '';

  form = this._formBuilder.group({
    title: this._formBuilder.control(null, [Validators.required]),
    description: this._formBuilder.control(null, ),    
  })

  onSubmit() {
    
    console.log('Form value:', this.form.value);
    console.log('Form valid:', this.form.valid);
    
    if (this.form.invalid) {
      this.showMessage = true;
      this.messageAlert = 'Verfique los campos';
      setTimeout(() => {
        this.showMessage = false;
        console.warn('Timeout');
      }, 3000);

      return;
    }

    this._notesService.insertNote({
      title:this.form.value.title ?? '',
      description: this.form.value.description ?? ''
    })
    .then((response) => {
      console.log('Insert response:', response);
      this.showMessage = true;
      this.messageAlert = 'Nota creada con éxito';
      this.form.reset();
      setTimeout(() => {
        this.showMessage = false;
        console.warn('Timeout');
      }, 3000);
    })
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotesService } from '../../data-access/notes.service';

@Component({
  selector: 'app-note-edit',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './note-edit.component.html',
  styles: ``
})
export class NoteEditComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _notesService = inject(NotesService);
  private _route = inject(ActivatedRoute);


  public showMessage: boolean = false;
  public messageAlert: string = '';
  private _noteId: string | null= null;

    form = this._formBuilder.group({
    title: this._formBuilder.control(null, [Validators.required]),
    description: this._formBuilder.control(null, ),    
  })

  constructor() {
  }

  ngOnInit() {
    this._noteId = this._route.snapshot.paramMap.get('id');

    this._notesService.getNoteById(this._noteId ?? '')
      .then((response) => {
        this.form.patchValue({
          title: response.data.title,
          description: response.data.description
        });
      })
      .catch((error) => {
        console.error('Error fetching note:', error);
      });
  } 

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

    this._notesService.updateNote(this._noteId ?? '', {
      title:this.form.value.title ?? '',
      description: this.form.value.description ?? ''
    })
    .then((response) => {
      console.log('Update response:', response);
      this._router.navigate(['/notes']);
    })
  }
}

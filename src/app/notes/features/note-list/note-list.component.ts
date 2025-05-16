import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/features/data-access/auth.service';
import { Router } from '@angular/router';
import { NotesService } from '../../data-access/notes.service';

@Component({
  selector: 'app-note-list',
  imports: [],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent {
  
  private _authService = inject(AuthService);
  private _router = inject(Router);
  noteService = inject(NotesService);

  async logOut() {
    await this._authService.signOut().then(() => {
      this._router.navigateByUrl('/auth/log-in');
    }); 
  }
  ngAfterViewInit() {
    this.noteService.getAllNotes();
  }
}



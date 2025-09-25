import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/features/data-access/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NotesService } from '../../data-access/notes.service';

@Component({
  selector: 'app-note-list',
  imports: [RouterModule],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent {
  
  noteService = inject(NotesService);

  ngAfterViewInit() {
    this.noteService.getAllNotes();
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id).then((response) => {
      console.log('Delete response:', response);
      this.noteService.getAllNotes();
    });
  }
}



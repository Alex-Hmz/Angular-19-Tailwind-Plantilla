import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('../note-list/note-list.component').then(m => m.NoteListComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('../note-create/note-create.component').then(m => m.NoteCreateComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('../note-edit/note-edit.component').then(m => m.NoteEditComponent)
    },

    {
        path: '**',
        redirectTo: '/'
    }
] as Routes
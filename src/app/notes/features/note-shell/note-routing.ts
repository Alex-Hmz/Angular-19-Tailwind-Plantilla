import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('../note-list/note-list.component').then(m => m.NoteListComponent)
    },

    {
        path: '**',
        redirectTo: '/'
    }
] as Routes
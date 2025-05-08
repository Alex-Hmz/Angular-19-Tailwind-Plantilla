import { Routes } from "@angular/router";

export default [
    {
        path: 'sign-up',
        loadComponent: () => import('../auth-sign-up/auth-sign-up.component').then(m => m.AuthSignUpComponent)  
    },
    {
        path: 'log-in',
        loadComponent: () => import('../auth-log-in/auth-log-in.component').then(m => m.AuthLogInComponent)
    },
    {
        path: '**',
        redirectTo: 'log-in'
    }
] as Routes
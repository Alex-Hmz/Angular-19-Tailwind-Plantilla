import { Routes } from '@angular/router';
import { publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [publicGuard],
        loadChildren: () => import('./auth/features/auth-shell/auth-routing').then(m => m.default)
    }
];

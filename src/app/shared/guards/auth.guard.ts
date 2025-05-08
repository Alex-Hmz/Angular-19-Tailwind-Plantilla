import { inject } from "@angular/core";
import { AuthService } from "../../auth/features/data-access/auth.service";
import { CanActivateFn, Router } from "@angular/router";

const routerInjection = () => inject(Router);
const authServiceInjection = () => inject(AuthService);

export const privateGuard:CanActivateFn = async() => {
    const router = routerInjection();
    const authService = authServiceInjection();

    const { data } = await authService.session();
    if(!data.session){
        router.navigate(['/auth/log-in']);
        return false;
    }
    
    return true;
};

export const publicGuard = async () => {
    const router = routerInjection();
    const authService = authServiceInjection();

    const { data } = await authService.session();
    if(data.session){
        router.navigate(['/']);
        return false;
    }
    
    return true;
};
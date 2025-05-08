import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../data-access/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
interface LoginError {
  code: number;
  error_code: string;
  msg: string;
}
@Component({
  selector: 'app-auth-log-in',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-log-in.component.html',
  styleUrl: './auth-log-in.component.scss'
})
export class AuthLogInComponent {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _authService = inject(AuthService);
  public showMessage: boolean = false;
  public messageAlert: string = '';

  form = this._formBuilder.group<LoginForm>({
    email: this._formBuilder.control(null, [Validators.required, Validators.email]),
    password: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(8),   
     
    ]),    
  })

  async onSubmit() {
    const { email, password } = this.form.value;

    
    if (this.form.invalid) return;

    try{
      const {error, data} = await this._authService.logIn({
        email: email  ?? '',
        password: password ?? ''
      })
  
      console.log('Auth response:', data);
      
      if (error) {
        const loginError: LoginError = {
          code: error.status || 0,
          error_code: error.name || 'unknown_error',
          msg: error.message || 'Unknown error occurred'
        };

        this.handleAuthError(loginError);
        return;
      }

      this._router.navigate(['/']);


    }catch (error) {
      this.mostrarAlerta(`Ocurrió un error inesperado: ${error}`);
    }
    

  }

  handleAuthError(error: LoginError) {
    const code = error.error_code;
  
    switch (code) {
      case "AuthApiError":
        this.mostrarAlerta('Credenciales incorrectas.');
        break;
      case 'email_not_confirmed':
        this.mostrarAlerta('Debes confirmar tu correo.');
        break;
      default:
        this.mostrarAlerta('Ocurrió un error inesperado.');
    }
  
    console.error('Auth error:', error);
  }

  mostrarAlerta(mensaje: string) {
    this.messageAlert = mensaje;
    this.showMessage = true;
  
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }
  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormBuilder
import { AuthService } from '../data-access/auth.service';
import { CommonModule } from '@angular/common';

interface SignUpForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-auth-sign-up',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.scss'
})
export class AuthSignUpComponent {

  private _formBuilder: FormBuilder = inject(FormBuilder);
  // private _router: RouterLink = inject(RouterLink);
  private _authService = inject(AuthService);
  
  form = this._formBuilder.group<SignUpForm>({
    email: this._formBuilder.control(null, [Validators.required, Validators.email]),
    password: this._formBuilder.control(null, [
      Validators.required, 
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]),    
  })

  async onSubmit() {
    const { email, password } = this.form.value;
    console.log('Form submitted:', { email, password });
    if (this.form.invalid) return;

    try{
      const {error, data} = await this._authService.signUp({
        email: email  ?? '',
        password: password ?? ''
      })
  
      console.log('Auth response:', data);
      
      if (error) {
        console.error('Error during sign up:', error.message);
        return;
      }
    }catch (error) {

      console.error('Error during sign up:', error);
      // Handle error (e.g., show a message to the user)
    }

    

  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }
}

import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/features/data-access/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  private _router = inject(Router);

  async logOut() {
    await this.authService.signOut().then(() => {
      this._router.navigateByUrl('/auth/log-in');
    }); 
  }


  
}

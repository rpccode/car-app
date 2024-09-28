import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { loginSuccess } from 'src/app/store/actions/auth.actions';
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonButtons,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrl: 'login.page.scss',
  standalone: true,
  imports: [
    IonText,
    CommonModule,
    RouterLink,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonLabel,
    IonButtons,
    IonInput,
    IonButton,
    IonText,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value.email, this.loginForm.value.password);
      try {
        const user = await this.authService
          .login(this.loginForm.value.email, this.loginForm.value.password)
          .toPromise();
        console.log(user);
        if (user) {
          this.store.dispatch(loginSuccess({ user }));
          await this.authService.persistUser(user);
          this.router.navigate(['/folder/inbox']);
        } else {
          console.error('User is undefined');
          // Manejar el caso de error, por ejemplo, mostrando un mensaje al usuario.
        }
      } catch (error) {
        console.error('Login error', error);
        // Manejar el error aquí también, tal vez una notificación para el usuario.
      }
    }
  }
}

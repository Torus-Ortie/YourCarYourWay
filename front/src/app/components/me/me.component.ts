import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { User } from '../../interfaces/user.interface';
import { SessionService } from "../../services/session.service";
import { Subject, takeUntil } from "rxjs";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private destroy$ = new Subject<void>();
  
  formControls: { [key: string]: FormControl } = {
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.email, Validators.required]),
  };

  labels = {
    name: 'Nom d’utilisateur',
    email: 'Adresse e-mail',
  };

  errorMessages = {
    name: '',
    email: '',
  };

  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sessionService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        if (this.user) {
          this.formControls['name'].setValue(this.user.name);
          this.formControls['email'].setValue(this.user.email);
        }
      });
  }

  onBlur(controlName: 'name' | 'email') {
    const control = this.formControls[controlName];
    control.markAsTouched();

    if (control.hasError('required')) {
      this.errorMessages[controlName] = `Veuillez saisir ${this.labels[controlName].toLowerCase()}`;
    } else if (control.hasError('minlength')) {
      this.errorMessages[controlName] = `${this.labels[controlName]} doit contenir au moins ${control.errors?.['minlength'].requiredLength} caractères.`;
    } else if (control.hasError('email')) {
      this.errorMessages[controlName] = `Veuillez saisir une adresse e-mail valide.`;
    } else {
      this.errorMessages[controlName] = '';
    }
  }

  onSubmit() {
    if (this.formControls["name"].valid && this.formControls['email'].valid) {
      if (this.user) {
        const updatedUser: User = {
          ...this.user,
          name: this.formControls['name'].value,
          email: this.formControls['email'].value,
        };

        this.userService.updateUser(updatedUser).subscribe({
          next: (user) => {
            this.sessionService.updateUser(user);
          },
          error: (err) => {
            console.error("Erreur lors de la mise à jour du profil", err);
            alert("Une erreur est survenue lors de la mise à jour du profil.");
          }
        });
      } else {
        this.sessionService.logOut();
      }
    }
  }

  onLogout() {
    this.sessionService.logOut();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

import { User } from '../../interfaces/user.interface';
import { SessionService } from "../../services/session.service";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit , OnDestroy {
  user: User | null = null;
  private userSubscription: Subscription | null = null;

  formControls: { [key: string]: FormControl } = {
    firstname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.email, Validators.required]),
  };

  labels: { [key: string]: string } = {
    firstname: 'Nom d’utilisateur',
    email: 'Adresse e-mail',
  };

  controlNames: { [key: string]: string } = {
    firstname: 'un nom d’utilisateur avec au moins 4 caractères',
    email: 'une adresse e-mail valide',
  };

  errorMessages: { [key: string]: string } = {
    firstname: '',
    email: '',
  };

  constructor(private sessionService: SessionService,
              private userService: UserService, private router: Router) {}


  ngOnInit(): void {
    this.userSubscription = this.sessionService.user$.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.formControls['firstname'].setValue(this.user.firstname);
        this.formControls['email'].setValue(this.user.email);
        this.formControls['role'].setValue(this.user.role);
      } else {
        this.formControls['firstname'].setValue('');
        this.formControls['email'].setValue('');
        this.formControls['role'].setValue('');
      }
    });
  }

  onBlur(controlName: string) {
    const control = this.formControls[controlName];
    control.markAsTouched();
    this.errorMessages[controlName] = control.hasError('required') ? `Veuillez saisir ${this.controlNames[controlName]}` : '';
  }

  onSubmit() {

    if (this.formControls["name"].valid && this.formControls['email'].valid) {
      if (this.user && this.user.id !== undefined && this.user.id !== null) {
        const updatedUser: User = {
          id: this.user.id,
          firstname: this.formControls['firstname'].value,
          lastname: this.formControls['lastname'].value,
          email: this.formControls['email'].value,
          password: this.user.password,
          role: this.formControls['role'].value
        };
        this.userService.updateUser(updatedUser).subscribe((user) => {
          this.sessionService.updateUser(user);
        });
      } else {
         this.sessionService.logOut();
    }
  }
  }

  onLogout(){
    this.sessionService.logOut();
    this.router.navigate(['/login']).then(
      () => {}
    );
  }


  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}

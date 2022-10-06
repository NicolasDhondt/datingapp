import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : { isMatching: true }
    }
  }

  register(){
    if(this.passwordIsValid()){
      this.accountService.register(this.registerForm.value).subscribe(reponse => {
        this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      })
    }else{
      this.toastr.error("The password need lowercase, uppercase and digits!");
    }
  }

  private passwordIsValid(): boolean{
    let hasNumber = /\d/.test(this.registerForm.controls.password.value);
    let hasUpper = /[A-Z]/.test(this.registerForm.controls.password.value);
    let hasLower = /[a-z]/.test(this.registerForm.controls.password.value);

    return hasNumber && hasUpper && hasLower;
  }

  cancel(){
    this.cancelRegister.emit(false)
  }

}

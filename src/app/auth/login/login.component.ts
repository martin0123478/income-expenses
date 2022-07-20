import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
loginForm!:FormGroup
  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
  login(){
    if(this.loginForm.invalid){return}
    const {email,password} = this.loginForm.value
    this.authService.loginUsuario(email,password).then(data=>{
Swal.fire({
  title: 'Espere un momento',
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    
  },
  
})
      console.log(data)
      Swal.close()
      this.router.navigateByUrl('/')
    }).catch(err => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message
      
    }))
    // console.log(this.loginForm.value)
  }



}

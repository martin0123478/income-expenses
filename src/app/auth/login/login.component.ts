import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit ,OnDestroy{
loginForm!:FormGroup
cargando: boolean = false
uiSubscription!:Subscription
  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AuthService,
    private store:Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
   this.uiSubscription= this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading
      
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }
  login(){
    if(this.loginForm.invalid){return}
    this.store.dispatch(isLoading())
    const {email,password} = this.loginForm.value
    this.authService.loginUsuario(email,password).then(data=>{
// Swal.fire({
//   title: 'Espere un momento',
//   timerProgressBar: true,
//   didOpen: () => {
//     Swal.showLoading()
    
//   },
  
// })
      
      // Swal.close()
      this.store.dispatch(stopLoading())
      this.router.navigateByUrl('/')
    }).catch(err => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message
      
    }))
    // console.log(this.loginForm.value)
  }



}

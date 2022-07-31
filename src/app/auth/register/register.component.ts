import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import{isLoading,stopLoading} from '../../shared/ui.actions'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit,OnDestroy {
miFormulario!:FormGroup
uiSubscription!:Subscription
cargando: boolean = false
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private store:Store<AppState>
    ) { }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      nombre:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })

    this.uiSubscription= this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading
      console.log('cargando')
    })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe()
  }
  crearUsuario(){
    if(this.miFormulario.invalid){return}
    this.store.dispatch(isLoading())
   const {nombre,email,password} = this.miFormulario.value
   this.authService.crearUsuario(nombre,email,password).
   then(credenciales=>{
    // Swal.fire({
    //   title: 'Espere un momento',
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading()
        
    //   },
      
    // })
    console.log(credenciales)
  
    // Swal.close()
    this.store.dispatch(stopLoading())
    this.router.navigate(['/'])
   }).catch(err =>{
    this.store.dispatch(stopLoading())
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message
      
    })
   } )
  }

}

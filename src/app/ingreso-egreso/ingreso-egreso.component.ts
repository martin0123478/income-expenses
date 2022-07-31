import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {
ingresoForm!:FormGroup;
tipo:string='ingreso';
cargando:boolean=false;
  loadingSubs: Subscription = new Subscription;
  constructor(private fb:FormBuilder,
    private ingresoEgresoService : IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
   this.loadingSubs= this.store.select('ui').subscribe(ui => this.cargando= ui.isLoading)
    this.ingresoForm = this.fb.group({
      descripcion:['',Validators.required],
      monto:['',Validators.required],

    })
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe()
  }
  enviar(){
    this.store.dispatch(isLoading())

    setTimeout(()=>{
      this.store.dispatch(stopLoading())
    },2500  )
    if(this.ingresoForm.invalid){return}
    console.log(this.ingresoForm.value)
    console.log(this.tipo)

    const {descripcion,monto} = this.ingresoForm.value
    const ingresoEgreso = new IngresoEgreso(descripcion,monto,this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(()=>{
      this.ingresoForm.reset()
      this.store.dispatch(stopLoading())
      Swal.fire({
        title: 'Registro Creado',
        text: descripcion,
        
      })
    })
    .catch(err =>{
      this.store.dispatch(stopLoading())
      Swal.fire({
      title: 'Error',
      text: err.message,
      
    }) 
  
  })
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
Swal
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit,OnDestroy {
ingresoEgreso:IngresoEgreso[] = []
  ingresoSubs: Subscription = new Subscription;
  constructor(private store:Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
   this.ingresoSubs= this.store.select('ingresosEgresos').subscribe(({items})=>{
    this.ingresoEgreso = items
    })
  }
  ngOnDestroy(): void {
      this.ingresoSubs.unsubscribe()
  }

  borrar(uid:any){
    this.ingresoEgresoService.borrarIngreso(uid)
    .then(() => Swal.fire('Borrado'))
    .catch(err => Swal.fire('Error',err.message))
  }

}

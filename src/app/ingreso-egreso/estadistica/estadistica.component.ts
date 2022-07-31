import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {
  ingreso:number =0
  egresos:number = 0
  TotalEgresos:number = 0
  TotalIngresos:number =0
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({items})=>{
      this.generarEstadistica(items)
    })
  }

  generarEstadistica(items:IngresoEgreso[]){
    for(const item of items){
      if(item.tipo === 'ingreso'){
        this.TotalIngresos += item.monto;
        this.ingreso++;
      }else{
        this.TotalEgresos += item.monto
        this.egresos++;
      }
    }
  }
}

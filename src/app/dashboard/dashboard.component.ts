import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit,OnDestroy {
  userSubs: Subscription = new Subscription;
  ingresosSubs: Subscription = new Subscription;
  constructor(private store:Store<AppState>,
    private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit(): void {
   this.userSubs= this.store.select('user')
    .pipe(
      filter(auth=>auth.user !=null)
    ) 
    .subscribe(({user})=>{
      
     this.ingresosSubs= this.ingresoEgresoService.initIngresoEgresoListener(user?.uid)
      .subscribe(ingresosFB=>{
        this.store.dispatch(setItems({items:ingresosFB}))
      })
    }
      )
  }

  ngOnDestroy(): void {
      this.userSubs?.unsubscribe()
      this.ingresosSubs?.unsubscribe()
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy{
nombre?:string = '' 
  userSubs: Subscription = new Subscription;
  constructor(private authService:AuthService,
    private router:Router,
    private store:Store<AppState>) { }

  ngOnInit(): void {
   this.userSubs= this.store.select('user').subscribe(({user})=>this.nombre = user?.nombre   )
  }

  ngOnDestroy(): void {
      this.userSubs.unsubscribe()
  }
  logout(){
    this.authService.logout().then(()=>{
      this.router.navigateByUrl('/login')
    })
   

  }

}

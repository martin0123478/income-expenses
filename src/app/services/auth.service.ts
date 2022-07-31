import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Usuario } from '../models/usuario.model';
import { setUser, unSetUser } from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSusbcription: Subscription = new Subscription; 
  constructor(public auth: AngularFireAuth,
    private firestore:AngularFirestore,
    private store:Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      console.log(fuser)
      if(fuser){
       this.userSusbcription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe(firestoreUser=>{
          console.log(firestoreUser)
          const user = Usuario.fromFirebase(firestoreUser)
           this.store.dispatch(setUser({user}))
        })
       
      }else{
        //llamando a unset
        
        this.userSusbcription.unsubscribe()
        this.store.dispatch(unSetUser());
      }
      
    })
  }

  crearUsuario(nombre:string,email:string,password:string){
   return  this.auth.createUserWithEmailAndPassword(email,password)
   .then(({user})=>{
    const newUser = new Usuario(user?.uid,nombre,email)
   return this.firestore.doc(`${user?.uid}/usuario`)
      .set({...newUser})
   })
  }
  loginUsuario(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password)
  }

  logout(){
   return this.auth.signOut()
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fuser => fuser != null)
    ) 
  }
}

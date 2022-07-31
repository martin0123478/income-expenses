import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore'
import { map } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore:AngularFirestore,
    private authService:AuthService) { }

  crearIngresoEgreso(ingresoEgreso:IngresoEgreso){
    const uid = this.authService.user.uid
    delete ingresoEgreso.uid
   return this.firestore.doc(`${uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoEgreso})
    
  }

  initIngresoEgresoListener(uid:any){
   return this.firestore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map(snapshot =>{
        return snapshot.map(doc =>{
          const data:any = doc.payload.doc.data()
           return {
            uid:doc.payload.doc.id,
            ...data
          }
        })
      })
    )
   
  }

  borrarIngreso(uidItem:string){
    return this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos/items/${uidItem}`)
    .delete()
  }
}


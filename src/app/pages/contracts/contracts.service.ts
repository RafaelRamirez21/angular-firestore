import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contracts } from 'src/app/shared/models/contract.interface';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class ContractsService {
  contracts!: Observable<Contracts[]>
  private contractsCollection:AngularFirestoreCollection<Contracts>;
  constructor(private readonly afs:AngularFirestore) {
    this.contractsCollection=afs.collection<Contracts>('contracts');
    this.getContracts();
   }
   onDeleteContract(contractID:string):Promise<void>{
     return new Promise(async(resolve,reject)=>{
       try {
         const result=await this.contractsCollection.doc(contractID).delete();
       } catch (error:any) {
         reject(error.message)
       }
     })
     
   }
   onSaveContract(contracts:Contracts,contractID:string):Promise<void>{
    return new Promise (async(resolve,reject)=>{
      try {
        const id=contractID || this.afs.createId()
        const data={id,...contracts};
        const result=this.contractsCollection.doc(id).set(data);
        resolve(result);
        
      } catch (error:any) {
       reject(error.message)
      }
    })
   }
   private getContracts():void{
    this.contracts=this.contractsCollection.snapshotChanges().pipe(
      map(actions=>actions.map(a=>a.payload.doc.data() as Contracts))
    );
    
   }
}

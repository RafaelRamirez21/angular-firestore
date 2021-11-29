import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Workers } from 'src/app/shared/models/worker.interface';
import { ContractsService } from '../contracts.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  contracts$=this.contractsSv.contracts;
  join$=this.contractsSv.join;
  workers$=this.contractsSv.workers;
  workers:Workers[] =[]
  
   

  
  constructor(private router:Router,private contractsSv:ContractsService) { }

  ngOnInit(): void {
    this.workers$.subscribe(worker => this.workers=worker as Workers[]);
 
  }
  onGoToEdit(item:any):void{
  
    this.router.navigate(['edit'],{ state: { value: item } })
  }
  onGoToView(item:any):void{
  
    this.router.navigate(['/details'],{ state: { value: item } })
  }
  onGoToDelete(id:any):any{
    try {
      this.contractsSv.onDeleteContract(id);
      alert('deleted');
      this.router.navigate(['/contracts'])
    } catch (error) {
      console.log(error)
    }
   
  }

  onGoToGenerate(item:any):void{
    alert('document generated')
    
  }
  updateName(id:any):any{
    try {
      console.log(this.workers)
      // this.workers.map(worker=>{
      //   console.log(worker)
      // }
      // )
      return 'hi'
      }    
     
     catch (error) {
      console.log(error)
    }
  }

}

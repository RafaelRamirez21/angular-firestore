import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ContractsService } from '../contracts.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  contracts$=this.contractsSv.contracts
  
  constructor(private router:Router,private contractsSv:ContractsService) { }

  ngOnInit(): void {
    
  }
  onGoToEdit(item:any):void{
  
    this.router.navigate(['edit'],{ state: { value: item } })
  }
  onGoToView(item:any):void{
  
    this.router.navigate(['/details'],{ state: { value: item } })
  }
  onGoToDelete(item:any):void{
    alert('deleted')
  }
  onGoToGenerate(item:any):void{
    alert('document generated')
  }

}

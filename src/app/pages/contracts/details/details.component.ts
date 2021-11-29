import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contracts } from 'src/app/shared/models/contract.interface';
import { ContractsService } from '../contracts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
contract:Contracts;
  constructor(private router:Router,private contractSv:ContractsService) { 
    const navigation=this.router.getCurrentNavigation();
    this.contract=navigation?.extras?.state?.['value'];
  }

  ngOnInit(): void {
    if(typeof this.contract==='undefined'){
      this.router.navigate(['/contracts'])
    }
  }
  onGoToEdit():void{
  
    this.router.navigate(['edit'],{ state: { value: this.contract } })
  }

onGoToDelete(id:any):any{
    try {
      this.contractSv.onDeleteContract(id);
      alert('deleted')
      this.goBack();
    } catch (error) {
      console.log(error)
    }
    
  }
  onGoToGenerate():void{
    alert('document generated')
  }
  goBack():void{
    this.router.navigate(['/contracts'])
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contracts } from 'src/app/shared/models/contract.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
contract:Contracts;
  constructor(private router:Router) { 
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

  onGoToDelete():void{
    alert('deleted')
  }
  onGoToGenerate():void{
    alert('document generated')
  }
  goBack():void{
    this.router.navigate(['/contracts'])
  }
}

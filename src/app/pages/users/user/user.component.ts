import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractsService } from '../../contracts/contracts.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  workers$=this.contractsSv.workers
  constructor(private router:Router,private contractsSv:ContractsService) { }

  ngOnInit(): void {
   
  }
  onGoToEdit(item:any):void{
    this.router.navigate(['/editWorker'],{ state: { value: item } })
  }

  onGoToDelete(id:any):any{
    try {
      this.contractsSv.onDeleteWorker(id);
      alert('deleted');
      this.router.navigate(['/contracts'])
    } catch (error) {
      console.log(error)
    }
  }

}

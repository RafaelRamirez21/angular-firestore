import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractsService } from 'src/app/pages/contracts/contracts.service';
import { Contracts } from '../../models/contract.interface';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {

  contract:Contracts; 
  contractForm: FormGroup=new FormGroup({});
  benefits:FormGroup=new FormGroup({})
 constructor(private router:Router,private fb:FormBuilder,private contractsSv:ContractsService) { 
   const navigation=this.router.getCurrentNavigation();
   this.contract=navigation?.extras?.state?.['value'];
   this.initForm()
   
 }

 ngOnInit(): void {
  
   if(typeof this.contract==='undefined'){
     this.router.navigate(['/new'])
   }else{
     this.contractForm.patchValue({
       contractId:this.contract.contractId,
       date:this.contract.date,
       companyName:this.contract.companyName,
       city:this.contract.city,
       state:this.contract.state,
       role:this.contract.role,
       salary:this.contract.salary,
       paymentPeriod:this.contract.paymentPeriod,
       performanceReviewPeriod:this.contract.performanceReviewPeriod,
       benefits:{
         name: this.contract.benefits.name,
         frequency:this.contract.benefits.frequency
       },
       workerId:this.contract.workerId,
     })

     
   }


 }
 onSave():void{
 console.log ("saved",this.contractForm.value);
 if(this.contractForm.valid){
   const contract=this.contractForm.value;
   const id=this.contract?.id || ""
  this.contractsSv.onSaveContract(contract,id);
  this.contractForm.reset();
 }
 }
 private initForm():void{
   this.contractForm=this.fb.group({
     contractId:['',[Validators.required]],
     date:['',[Validators.required]],
     companyName:['',[Validators.required]],
     city:['',[Validators.required]],
     state:['',[Validators.required]],
     role:['',[Validators.required]],
     salary:['',[Validators.required]],
     paymentPeriod:['',[Validators.required]],
     performanceReviewPeriod:['',[Validators.required]],
     benefits:new FormGroup({
       name: new FormControl(),
       frequency:new FormControl()
     }),
     workerId:['',[Validators.required]],
   })
 }
 goBack():void{
   this.router.navigate(['/contracts'])
 }
}

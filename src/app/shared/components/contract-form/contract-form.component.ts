import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
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
  // benefits:FormGroup=new FormGroup({})

  


  benefits:FormArray=new FormArray([]);
 constructor(private router:Router,private fb:FormBuilder,private contractsSv:ContractsService,private afs: AngularFirestore) { 
   const navigation=this.router.getCurrentNavigation();
   this.contract=navigation?.extras?.state?.['value'];
   this.initForm()
   
 }

 ngOnInit(): void {
  
   if(typeof this.contract==='undefined'){
     this.router.navigate(['/new'])
   }else{
     this.contractForm.patchValue(this.contract)

     
   }


 }
 onSave():void{
 this.benefits=this.contractForm.get('benefits') as FormArray;
 console.log ("saved",this.contractForm.value);
 if(this.contractForm.valid){
   const contract=this.contractForm.value;
   const id=this.contract?.id || ""
  this.contractsSv.onSaveContract(contract,id);
  alert('user added')
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
     benefits:this.fb.array([]),
     workerId:['',[Validators.required]],
   })
 }

  createBenefit(): FormGroup {
    return this.fb.group({
      name: '',
      frequency:''
    })
  }

  addBenefit():void{
    this.benefits=this.contractForm.get('benefits') as FormArray;
    console.log(this.benefits)
    this.benefits.push(this.createBenefit())
  }
 goBack():void{
   this.router.navigate(['/contracts'])
 }


//  private initForm():void{
//   this.contractForm=this.fb.group({
//     contractId:['',[Validators.required]],
//     date:['',[Validators.required]],
//     companyName:['',[Validators.required]],
//     city:['',[Validators.required]],
//     state:['',[Validators.required]],
//     role:['',[Validators.required]],
//     salary:['',[Validators.required]],
//     paymentPeriod:['',[Validators.required]],
//     performanceReviewPeriod:['',[Validators.required]],
//     benefits:new FormGroup({
//       name: new FormControl(),
//       frequency:new FormControl()
//     }),
//     workerId:['',[Validators.required]],
//   })
// }
}

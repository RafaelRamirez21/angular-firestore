import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractsService } from 'src/app/pages/contracts/contracts.service';
import { Workers } from '../../models/worker.interface';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.scss']
})
export class WorkerFormComponent implements OnInit {

  workers:Workers; 
  workerForm: FormGroup=new FormGroup({});
 constructor(private router:Router,private fb:FormBuilder,private contractsSv:ContractsService) { 
   const navigation=this.router.getCurrentNavigation();
   this.workers=navigation?.extras?.state?.['value'];
   this.initForm();
 }

 ngOnInit(): void {
   if(typeof this.workers==='undefined'){
     this.router.navigate(['/newWorker'])
   }else{
     this.workerForm.patchValue(this.workers)
   }
 }
 onSave():void{
  console.log ("saved",this.workerForm.value);
  if(this.workerForm.valid){
    const worker=this.workerForm.value;
    const id=this.workers?.id || ""
   this.contractsSv.onSaveWorker(worker,id);
   alert('edited')
   this.workerForm.reset();
   
  }
 }
 private initForm():void{
   this.workerForm=this.fb.group({
     workerId:['',[Validators.required]],
     fullName:['',[Validators.required]]
   })
 }

 goBack():void{
   this.router.navigate(['/workers'])
 }
}

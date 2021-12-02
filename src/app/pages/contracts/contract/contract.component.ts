import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {imageLogo} from "./image.const"
import { Workers } from 'src/app/shared/models/worker.interface';
import { ContractsService } from '../contracts.service';
import { Packer } from "docx";
import * as fs from "file-saver";
import { DocumentCreator } from "./contract-generator";
import { Contracts } from 'src/app/shared/models/contract.interface';
import { DomSanitizer } from '@angular/platform-browser';
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
  contracts:Contracts[]=[]
  CompanyLogo:any
  modal:boolean=false
  base64TextStringCompany!: string;
  base64TextStringWorker!: string;
  item!:Contracts;
  name!:string
   

  
  constructor(private router:Router,private contractsSv:ContractsService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.workers$.subscribe(worker => this.workers=worker as Workers[]);
    this.contracts$.subscribe(contract => this.contracts=contract as Contracts[]);
    this.CompanyLogo=this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${imageLogo}`);
    
 
  }
  onGoToEdit(item:any):void{
  
    this.router.navigate(['edit'],{ state: { value: item } })
  }
  onGoToView(item:any):void{
  
    this.router.navigate(['/details'],{ state: { value: item } })
  }

  openModal(item: Contracts,name: string){
    this.modal=!this.modal;
    this.item=item;
    this.name=name
    console.log(this.item)
    console.log(this.name)
  }
  
  closeModal(){
    this.modal=!this.modal;
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

  public onGoToGenerate():void{
    this.modal=!this.modal;
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      this.item,
      this.name,
      this.contracts,
      this.workers,
      this.base64TextStringCompany,
      this.base64TextStringWorker

    ]);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      fs.saveAs(blob, "template.docx");
      console.log("Document created successfully");
    });
  }
  handleFileSelect(e:any){
    
    const files = e.target.files;
    const file = files[0];
    const {id}=e.target;
  

  if (files && file) {
      const reader = new FileReader();
      console.log(reader)
   if(id==='formFile-worker'){
      reader.onload =this._handleReaderLoadedWorker.bind(this);
      reader.readAsBinaryString(file);
   }else{
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
   }
  }
}



_handleReaderLoadedWorker(readerEvt:any) {
    console.log(readerEvt)
   const binaryString = readerEvt.target.result;

          this.base64TextStringWorker= btoa(binaryString);
          console.log(btoa(binaryString));
  }
_handleReaderLoaded(readerEvt:any) {
    console.log(readerEvt)
   const binaryString = readerEvt.target.result;

          this.base64TextStringCompany= btoa(binaryString);
          console.log(btoa(binaryString));
  }
  

}

import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {imageLogo} from "./image.const"
import { Workers } from 'src/app/shared/models/worker.interface';
import { ContractsService } from '../contracts.service';
import { Packer } from "docx";
import * as fs from "file-saver";
import { DocumentCreator } from "./contract-generator";
import { experiences, education, skills, achievements } from "./data";
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
  onGoToDelete(id:any):any{
    try {
      this.contractsSv.onDeleteContract(id);
      alert('deleted');
      this.router.navigate(['/contracts'])
    } catch (error) {
      console.log(error)
    }
   
  }

  public onGoToGenerate(item:any,name:any):void{
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      item,
      name,
      this.workers$,
      this.contracts$
    ]);

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      fs.saveAs(blob, "template.docx");
      console.log("Document created successfully");
    });
  }

}

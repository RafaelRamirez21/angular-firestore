import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  fakeData=[
    {
      "contractId": 1,
      "date": "2021-10-25",
      "companyName": "Devcast",
      "city": "Qiaoyi",
      "state": "Primer",
      "role": "Engineer",
      "salary": "$7725.34",
      "paymentPeriod": "per hour",
      "performanceReviewPeriod": "annual",
      "benefits": [
        {
          "name":"Health Insurance",
          "frequency":"the duration of the contract"
        }
      ],
      "workerId": 1
    }, {
      "contractId": 2,
      "date": "2021-10-25",
      "companyName": "Npath",
      "city": "Protaras",
      "state": "Primer",
      "role": "Architect",
      "salary": "$4278.66",
      "paymentPeriod": "per hour",
      "performanceReviewPeriod": "annual",
      "benefits": [
        {
          "name":"Health Insurance",
          "frequency":"the duration of the contract"
        }
      ],
      "workerId": 2
    }, {
      "contractId": 3,
      "date": "2021-10-25",
      "companyName": "Yozio",
      "city": "Longtian",
      "state": "Primer",
      "role": "Surveyor",
      "salary": "$7454.66",
      "paymentPeriod": "per annum",
      "performanceReviewPeriod": "annual",
      "benefits": [
        {
          "name":"Health Insurance",
          "frequency":"the duration of the contract"
        }
      ],
      "workerId": 3
    }
  ]
  constructor(private router:Router) { }

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

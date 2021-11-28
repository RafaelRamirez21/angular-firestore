export interface Contracts{
  id?:string,
  contractId:string,
  date:Date,
  companyName:string,
  city:string,
  state:string,
  role:string,
  salary:string,
  paymentPeriod:string,
  performanceReviewPeriod:string,
  benefits:{
    name:string,
    frequency:string
  },
  workerId:string
}

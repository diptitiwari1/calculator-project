export interface FormDataInterface {
  numberOfSecurities: string;
  frequency: string;
  hoursPerDay: string;
  requestsPerDay: number;
  quotesPerDay: number;
  quotesPerMonth: number;
  numberOfSecuritiesError?: string,
  hoursPerDayError?:string,
  fee?:number
}
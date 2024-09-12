import { ParcelItem } from "src/app/parcel-item/model/parcel-item";

export interface Company {

  id: number;
  companyName: string;
  address: Address;
  parcels?: Parcel[];
  branches?: Branch[];
  weightBands?: WeightBand[];
}



export interface Address {
  email: string;
  contact: string;
  country: string;
  city: string;
  location: string;
  regNo: string;
  postalAddress: string;
}

export interface Branch {
  id: number;
  branchCode: string;
  branchName: string;
  address: Address;
  company: Company;
  
}

export interface BranchDTO {
  id?: number;
  branchCode: string;
  branchName: string;
  address: Address;
}

export interface WeightBand {
  id: number;
  minWeight: string;
  maxWeight: string;
  cost: string;
  company: Company
  
}

export interface Parcel {
  fromBranch: any;
  toBranch: any;
  id: number;
  fromName: string;
  fromEmail: string;
  fromPhone: string;
  toName: string;
  toEmail: string;
  toPhone: string;
  fromBranchId: number;
  toBranchId: number;
  itemDescription: string;
  dateRecorded: Date;
  cost:number;
  weight: number;
  trackingReference: string;
  status: string;
  company: Company
  
}

export interface EmailSettings{  
    id: number;
    companyId: number;
    host: string;
    port: number;
    username: string;
    password: string;
  
}

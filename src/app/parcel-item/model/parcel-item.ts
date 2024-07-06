import { Parcel } from "src/app/company/model/company";


export interface ParcelItem {

    id: number,
    itemType: string,
    itemName: string,
    itemDescription: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;

   // parcel: Parcel[];

}

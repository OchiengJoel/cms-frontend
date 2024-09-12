import { Company } from "src/app/company/model/company";

export interface Project {

    id: number,
    name: string,
    description: string,
    projectBudget: number;
    projectStatus: string;
    projectStartDate: Date;
    projectEndDate: Date;
    projectLocation: string;
    
    company: Company
}

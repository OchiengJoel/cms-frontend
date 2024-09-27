import { Company } from "src/app/company/model/company";
import { Task, TaskStatus } from "../../task/model/task";

export interface Project {
    id: number;
    name: string;
    description: string;
    projectBudget: number;
    projectStatus: string;
    projectStartDate: Date;
    projectEndDate: Date;
    projectLocation: string;
    tasks: Task[];  // Full Task objects
    taskIds: number[];  // List of Task IDs
    company: Company;
  }




  
  // export interface ProjectDTO {
  //   id: number;
  //   name: string;
  //    // If your backend sends only task IDs and not full task details:
  //   taskIds: number[];  // Add this line
  //   tasks: TaskDTO[]; // Array of tasks associated with the project
    
  // }

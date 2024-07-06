import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/company/model/company';
import { CompanyService } from 'src/app/company/service/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //companies!: Company[];
  companies: Company[] = [];
  selectedCompanyId: number | null = null;
  errorMessage: string = ''; // Ensure 'errorMessage' is declared

  constructor(
    private companyService:CompanyService
  ){

  }

  ngOnInit(): void {
    this.fetchCompanies();
    this.subscribeToSelectedCompany();
    this.companyService.getSelectedCompanyId().subscribe(id => {
      this.selectedCompanyId = id;
      // You can load company-specific data here based on the selectedCompanyId
      // For example, fetch branches, weight bands, parcels, etc.
    });
  }

  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching companies: ' + error; // Set errorMessage on error
        console.error(this.errorMessage);
      }
    );
  }


  selectCompany(companyId: number): void {
    this.companyService.switchCompany(companyId);
  }

  switchCompany(companyId: number): void {
    this.companyService.switchCompany(companyId);
    // Logic to refresh data based on the selected company can be added here
  }

  subscribeToSelectedCompany(): void {
    this.companyService.getSelectedCompanyId().subscribe(
      (companyId) => {
        this.selectedCompanyId = companyId;
        if (companyId !== null) {
          this.loadCompanySpecificData(companyId); // Ensure companyId is not null
        }
      },
      (error) => {
        this.errorMessage = 'Error subscribing to selected company id: ' + error;
        console.error(this.errorMessage);
      }
    );
  }

  loadCompanySpecificData(companyId: number): void {
    // Example: Fetch additional data based on the selected company ID
    // Replace with your actual implementation
    console.log(`Fetching additional data for company ID: ${companyId}`);
    // Implement your data loading logic here
    // For example:
    // this.companyService.getBranches(companyId).subscribe(...);
    // this.companyService.getWeightBands(companyId).subscribe(...);
    // this.companyService.getParcels(companyId).subscribe(...);
  }


  // fetchCompanies(): void {
  //   this.companyService.getCompanies().subscribe(companies => {
  //     this.companies = companies;
  //   });
    
  // }

 

  subMenuState: { [key: string]: boolean } = {
    menu1: false,
    menu2: false
  };

  toggleSubMenu(menu: string) {
    this.subMenuState[menu] = !this.subMenuState[menu];
  }

  isSubMenuOpen(menu: string) {
    return this.subMenuState[menu];
  }

  toggleDrawer() {
    // Add your logic to toggle the drawer here
    // Example: this.drawer.toggle();
  }

  

}

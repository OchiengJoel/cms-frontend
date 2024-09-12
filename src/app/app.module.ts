import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import{ MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNavList } from '@angular/material/list';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ItemCategoryComponent } from './pages/item-category/item-category.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemcategoryAddEditComponent } from './pages/item-category/itemcategory-add-edit/itemcategory-add-edit.component';
import { AccountsListComponent } from './components/accounts/accounts-list/accounts-list.component';
import { AccountsCreateComponent } from './components/accounts/accounts-create/accounts-create.component';
import { AccountsEditComponent } from './components/accounts/accounts-edit/accounts-edit.component';
import { ItemsListComponent } from './components/items/items-list/items-list.component';
import { ItemsCreateComponent } from './components/items/items-create/items-create.component';
import { ItemsEditComponent } from './components/items/items-edit/items-edit.component';
import { AccountsLedgerComponent } from './components/accounts/accounts-ledger/accounts-ledger.component';
import { ConfirmDialogComponent } from './components/utils/confirm-dialog/confirm-dialog.component';
import { ParcelItemsComponent } from './parcel-item/component/parcel-items/parcel-items.component';
import { ParcelItemsAddComponent } from './parcel-item/component/add/parcel-items-add/parcel-items-add.component';
import { ParcelItemsEditComponent } from './parcel-item/component/edit/parcel-items-edit/parcel-items-edit.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CompanyListComponent } from './company/component/list/company-list/company-list.component';
import { CompanyAddEditComponent } from './company/component/addedit/company-add-edit/company-add-edit.component';
import { BranchListComponent } from './branch/component/list/branch-list/branch-list.component';
import { BranchAddeditComponent } from './branch/component/addedit/branch-addedit/branch-addedit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WeightbandListComponent } from './weightband/component/list/weightband-list/weightband-list.component';
import { WeightbandAddeditComponent } from './weightband/component/addedit/weightband-addedit/weightband-addedit.component';
import { ParcelAddeditComponent } from './parcels/component/addedit/parcel-addedit/parcel-addedit.component';
import { ParcelListComponent } from './parcels/component/list/parcel-list/parcel-list.component';
import { ListEmailConfigComponent } from './notification/component/list-email-config/list-email-config.component';
import { ListSmsConfigComponent } from './notification/component/list-sms-config/list-sms-config.component';
import { AddeditSmsConfigComponent } from './notification/component/addedit-sms-config/addedit-sms-config.component';
import { AddeditEmailConfigComponent } from './notification/component/addedit-email-config/addedit-email-config.component';
import { RouterModule } from '@angular/router';
import { ProjectListComponent } from './pms/project/component/project-list/project-list.component';
import { TaskListComponent } from './pms/task/component/task-list/task-list.component';
import { TaskAddeditComponent } from './pms/task/component/task-addedit/task-addedit.component';
import { ProjectAddeditComponent } from './pms/project/component/project-addedit/project-addedit.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LayoutComponent,
    ItemCategoryComponent,
    ItemcategoryAddEditComponent,
    AccountsListComponent,
    AccountsCreateComponent,
    AccountsEditComponent,
    ItemsListComponent,
    ItemsCreateComponent,
    ItemsEditComponent,
    AccountsLedgerComponent,
    ConfirmDialogComponent,
    ParcelItemsComponent,
    ParcelItemsAddComponent,
    ParcelItemsEditComponent,
    CompanyListComponent,
    CompanyAddEditComponent,
    BranchListComponent,
    BranchAddeditComponent,
    WeightbandListComponent,
    WeightbandAddeditComponent,
    ParcelAddeditComponent,
    ParcelListComponent,
    ListEmailConfigComponent,
    ListSmsConfigComponent,
    AddeditSmsConfigComponent,
    AddeditEmailConfigComponent,
    ProjectListComponent,
    TaskListComponent,
    TaskAddeditComponent,
    ProjectAddeditComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    RouterModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

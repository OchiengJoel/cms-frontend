import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ItemCategoryComponent } from './pages/item-category/item-category.component';
import { AccountsListComponent } from './components/accounts/accounts-list/accounts-list.component';
import { ParcelItemsComponent } from './parcel-item/component/parcel-items/parcel-items.component';
import { CompanyListComponent } from './company/component/list/company-list/company-list.component';
import { BranchListComponent } from './branch/component/list/branch-list/branch-list.component';
import { WeightbandListComponent } from './weightband/component/list/weightband-list/weightband-list.component';
import { ParcelListComponent } from './parcels/component/list/parcel-list/parcel-list.component';
import { ListEmailConfigComponent } from './notification/component/list-email-config/list-email-config.component';

const routes: Routes = [

  {
    path: '', redirectTo:'dashboard', pathMatch:'full'
  },

  {
    path:'dashboard', component:DashboardComponent,
    children:[
      {
        path:'itemcategory', component:ItemCategoryComponent
      },

      {
        path:'accounts', component: AccountsListComponent
      },
      
      {
        path:'parcelitems', component: ParcelItemsComponent
      },

      {
        path:'companies', component: CompanyListComponent
      },

      {
        path:'branches', component: BranchListComponent
      },

      {
        path:'weightbands', component: WeightbandListComponent
      },
      
      {
        path:'parcels', component: ParcelListComponent
      },

      {
        path:'notifications', component: ListEmailConfigComponent
      }
    ]
  },

  {
    path:'itemcategory1', component:ItemCategoryComponent
  },

  {
    path:'accounts1', component: AccountsListComponent
  },

  {
    path:'parcelitems1', component: ParcelItemsComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

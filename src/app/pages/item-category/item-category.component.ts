import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemCategory } from 'src/app/model/item-category';
import { ItemCategoryService } from 'src/app/service/icat/item-category.service';
import { ItemcategoryAddEditComponent } from './itemcategory-add-edit/itemcategory-add-edit.component';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css']
})
export class ItemCategoryComponent {

  
  title: string;
  itemCategoryList !: ItemCategory[];
  dataSource: any;
  //displayedColumns: string[] = ["code", "brand", "name", "status", "action"];
  displayedColumns: string[] = ["type", "code", "name", "action"]
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: ItemCategoryService,
    private dialog: MatDialog) {
    this.title = "Item Categories";
  }
  ngOnInit(): void {
    this.getItemCategoryList();
  }

  getItemCategoryList() {
    this.service.getItemCategoryList().subscribe(res => {
      this.itemCategoryList = res;
      this.dataSource = new MatTableDataSource<ItemCategory>(this.itemCategoryList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  //Search functionality
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value
  }

  openAddEditItemCategoryDialog() {
    const dialogRef = this.dialog.open(ItemcategoryAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getItemCategoryList();
        }
      },
    });
  }



  openEditForm(data: any) {
    const dialogRef = this.dialog.open(ItemcategoryAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getItemCategoryList();
        }
      }
    })
  }

  deleteItemCategory(id: number) {
    let confirm = window.confirm("Are you sure you want to delete selected item?");
    if (confirm) {
      this.service.deleteItemCategory(id).subscribe({
        next: (res) => {
          alert('Item Deleted Successfully');
          this.getItemCategoryList();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

}

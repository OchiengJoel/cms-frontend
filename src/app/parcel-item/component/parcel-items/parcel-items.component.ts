import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ParcelItemService } from '../../service/parcel-item.service';
import { ParcelItem } from '../../model/parcel-item';
import { MatTableDataSource } from '@angular/material/table';
import { ParcelItemsEditComponent } from '../edit/parcel-items-edit/parcel-items-edit.component';
import { ParcelItemsAddComponent } from '../add/parcel-items-add/parcel-items-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-parcel-items',
  templateUrl: './parcel-items.component.html',
  styleUrls: ['./parcel-items.component.css']
})
export class ParcelItemsComponent implements OnInit {

  title: string;
  parcelItemList: ParcelItem[] = [];
  displayedColumns: string[] = ["itemType", "itemName", "itemDescription", "action"];
  dataSource: MatTableDataSource<ParcelItem> = new MatTableDataSource<ParcelItem>([]);  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private parcelItemService: ParcelItemService,
    private dialog: MatDialog,    
    private snackBar: MatSnackBar
  ) {

    this.title = "Items Catalog"

  }

  ngOnInit(): void {
    this.fetchParcelItems();
  }

  openFormDialog(parcelItem?: ParcelItem): void {
    const dialogRef = this.dialog.open(ParcelItemsAddComponent, {
      width: '600px',
      data: parcelItem
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchParcelItems();
      }
    });
  }

  fetchParcelItems(): void {
    this.parcelItemService.getParcelItems().subscribe(
      res => {
        this.parcelItemList = res;
        this.dataSource.data = this.parcelItemList
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching items:', error);
        // Handle the error (e.g., display an error message)
      }
    )
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  

  deleteParcelItem(id: number): void {
    let confirm = window.confirm("Are you sure you want to delete selected item?");
    if (confirm) {
      this.parcelItemService.deleteParcelItem(id).subscribe({
        next: (res) => {
          alert("Item Deleted");
          duration: 2000
          this.fetchParcelItems();
        },
        error(err) {
          console.log(err);
        },
      });

    }
  }

  // addItemDialog(){
  //   const dialogRef = this.dialog.open(ParcelItemsAddComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.fetchParcelItems();

  //       }
  //     }
  //   });
  // }

  // openEditForm(data: ParcelItem) {
  //   const dialogRef = this.dialog.open(ParcelItemsEditComponent, {
  //     data,
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.fetchParcelItems();          
  //       }
  //     },      
  //   })
  //   }

  // openEditForm(parcelItem: ParcelItem) {
  //   const dialogRef = this.dialog.open(ParcelItemsEditComponent, {
  //     data: parcelItem
  //   });

  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.fetchParcelItems();
  //       }
  //     },
  //   });
  // }  

  // deleteParcelItem(id: number): void {
  //   this.parcelItemService.deleteParcelItem(id).subscribe(() => {
  //     this.snackBar.open('Item deleted', 'Close', {
  //       duration: 2000
  //     });
  //     this.fetchParcelItems();
  //   });
  // }


}

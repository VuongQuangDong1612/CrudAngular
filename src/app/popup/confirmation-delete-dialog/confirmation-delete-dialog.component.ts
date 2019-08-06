import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-delete-dialog',
  templateUrl: './confirmation-delete-dialog.component.html'
})
export class ConfirmationDeleteDialogComponent implements OnInit {
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { 
      this.message = data;
    }

  ngOnInit() {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }
 
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
  
}

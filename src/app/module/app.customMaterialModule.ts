import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
@NgModule({
  imports: [
    MatButtonModule, MatDialogModule, BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule, MatDialogModule , BrowserAnimationsModule
  ]
})
export class CustomMaterialModule {}
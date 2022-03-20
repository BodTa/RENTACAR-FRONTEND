import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatFormFieldModule,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}

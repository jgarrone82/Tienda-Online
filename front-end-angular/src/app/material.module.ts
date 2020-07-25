import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const ComponentesImportados = [
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatAutocompleteModule
]

@NgModule({
    imports: [ComponentesImportados],
    exports: [ComponentesImportados]
})

export class MaterialModule{}

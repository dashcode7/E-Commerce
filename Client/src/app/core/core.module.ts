import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
NavBarComponent,
SubHeaderComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-top-right",
      preventDuplicates:true
    }),
    BreadcrumbModule,
    NgxSpinnerModule.forRoot({type:'timer'})
  ],
  exports:[NavBarComponent,SubHeaderComponent,NgxSpinnerModule]
})
export class CoreModule { }

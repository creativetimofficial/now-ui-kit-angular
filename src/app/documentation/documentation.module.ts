import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentationRoutes } from './documentation.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';

import { DocumentationComponent } from './documentation.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CheckboxRadioSwitchComponent } from './checkbox-radio-switch/checkbox-radio-switch.component';
import { InputsComponent } from './inputs/inputs.component';
import { TextareaComponent } from './textarea/textarea.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { LabelsComponent } from './labels/labels.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavpillsComponent } from './navpills/navpills.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SlidersComponent } from './sliders/sliders.component';
import { ModalsComponent } from './modals/modals.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TooltipsPopoversComponent } from './tooltips-popovers/tooltips-popovers.component';
import { ChangingColorsComponent } from './changing-colors/changing-colors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(DocumentationRoutes),
    NgbModule,
    NouisliderModule,
    JWBootstrapSwitchModule
  ],
  declarations: [
      DocumentationComponent,
      TutorialComponent,
      ButtonsComponent,
      CheckboxRadioSwitchComponent,
      InputsComponent,
      TextareaComponent,
      DropdownsComponent,
      LabelsComponent,
      NavigationComponent,
      NavpillsComponent,
      PaginationComponent,
      ProgressbarComponent,
      NotificationsComponent,
      SlidersComponent,
      ModalsComponent,
      DatepickerComponent,
      TooltipsPopoversComponent,
      ChangingColorsComponent
  ]
})
export class DocumentationModule { }

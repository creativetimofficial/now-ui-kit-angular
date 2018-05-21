import { Routes } from '@angular/router';

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

export const DocumentationRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: 'tutorial',
            component: TutorialComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'buttons',
            component: ButtonsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'checkbox-radio-switches',
            component: CheckboxRadioSwitchComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'inputs',
            component: InputsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'textarea',
            component: TextareaComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'dropdowns',
            component: DropdownsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'labels',
            component: LabelsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'navigation',
            component: NavigationComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'navpills',
            component: NavpillsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'pagination',
            component: PaginationComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'progressbar',
            component: ProgressbarComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'notifications',
            component: NotificationsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'sliders',
            component: SlidersComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'modals',
            component: ModalsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'datepicker',
            component: DatepickerComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'tooltips-popovers',
            component: TooltipsPopoversComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'changing-colors',
            component: ChangingColorsComponent
        }]
    }
];

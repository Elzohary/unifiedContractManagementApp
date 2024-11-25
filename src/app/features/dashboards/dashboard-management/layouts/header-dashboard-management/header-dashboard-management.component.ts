import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header-dashboard-management',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './header-dashboard-management.component.html',
  styleUrl: './header-dashboard-management.component.scss'
})
export class HeaderDashboardManagementComponent {

  private _formBuilder = inject(FormBuilder);

  isDark = false;
  formGroup = this._formBuilder.group({
    enableWifi: '',
    acceptTerms: ['', Validators.requiredTrue],
  });

  alertFormValues(formGroup: FormGroup) {
    alert(JSON.stringify(formGroup.value, null, 2));
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    const themeClass = this.isDark ? 'dark-theme' : 'light-theme';
    document.body.className = themeClass;
  }
}

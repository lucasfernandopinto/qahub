import { Component, OnInit } from '@angular/core';
import { AutomationService } from '../../services/automation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Automation } from '../../models/automation.model';

@Component({
  selector: 'app-automation-form',
  templateUrl: './automation-form.component.html',
  styleUrls: ['./automation-form.component.css']
})
export class AutomationFormComponent implements OnInit {
  automation: Automation = {
    pipeline: '',
    result: '',
    startDate: new Date(),
    endDate: new Date()
  };
  isEditMode: boolean = false;

  constructor(
    private automationService: AutomationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.automationService.getAutomationById(+id).subscribe(data => {
        this.automation = data;
      });
    }
  }

  saveAutomation(): void {
    if (this.isEditMode) {
      this.automationService.updateAutomation(this.automation.id!, this.automation).subscribe(() => {
        this.router.navigate(['/automations']);
      });
    } else {
      this.automationService.createAutomation(this.automation).subscribe(() => {
        this.router.navigate(['/automations']);
      });
    }
  }
}

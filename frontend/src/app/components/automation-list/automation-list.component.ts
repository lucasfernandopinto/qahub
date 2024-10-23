import { Component, OnInit } from '@angular/core';
import { AutomationService } from '../../services/automation.service';
import { Automation } from '../../models/automation.model';

@Component({
  selector: 'app-automation-list',
  templateUrl: './automation-list.component.html',
  styleUrls: ['./automation-list.component.css']
})
export class AutomationListComponent implements OnInit {
  automations: Automation[] = [];

  constructor(private automationService: AutomationService) { }

  ngOnInit(): void {
    this.automationService.getAutomation().subscribe(data => {
      this.automations = data;
    });
  }

  deleteAutomation(id: number): void {
    this.automationService.deleteAutomation(id).subscribe(() => {
      this.automations = this.automations.filter(automation => automation.id !== id);
    });
  }
}
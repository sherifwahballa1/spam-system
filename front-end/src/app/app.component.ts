import { Component, OnInit } from '@angular/core';
import { ReportService } from './core/http/report/report.service';
import { Report } from './core/interfaces/reports/reports';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spam-system';

  reports: Report[] = [];

  constructor(private reportService: ReportService) { }

  async ngOnInit() {
    await this.getAllReports();
  }

  async getAllReports() {
    this.reports = await this.reportService.allReports().toPromise();
  }
  async resolve(reportID) {
    try {
      let data = await this.reportService.resolveReport(reportID).toPromise();
      await this.getAllReports();
      alert(data['message'])
    } catch (error) {
      alert(error['message'])
    }
  }

  async block(contentID) {
    try {
      let data = await this.reportService.blockReport(contentID).toPromise();
      await this.getAllReports();
      alert(data['message'])
    } catch (error) {
      alert(error['message'])
    }
  }
}

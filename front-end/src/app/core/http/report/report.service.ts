import { Injectable } from '@angular/core';
import { Report, AllReports } from '../../interfaces/reports/reports';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { shareReplay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  reports: Report[] = [];

  public allReports$ = new BehaviorSubject<Report[]>(this.reports);

  constructor(private http: HttpClient) { }


  resolveReport(reportId) {
    return this.http.put(`${environment.host}/reports/${reportId}`, { ticketState: "CLOSED" });
  }

  blockReport(contentID) {
    return this.http.post(`${environment.host}/reports/${contentID}`, {});
  }

  allReports(): Observable<Report[]> {
    return this.http
      .get(
        `${environment.host}/reports/`,
        {
          observe: "body",
          withCredentials: true,
        }
      )
      .pipe(
        map((reports: AllReports) => {
          return reports.reports
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
      );
  }

}

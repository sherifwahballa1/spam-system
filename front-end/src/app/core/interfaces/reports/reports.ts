export interface Report {
  id: string;
  source: string;
  sourceIdentityId: string;
  reference: {
    referenceId?: string,
    referenceType?: string
  };
  state: string,
  payload: {
    source: string;
    reportType?: string,
    message?: string,
    reportId: string,
    referenceResourceId: string,
    referenceResourceType: string
  },
  createdAt?: Date;
}

export interface AllReports {
  count: number;
  reports: [Report]
}

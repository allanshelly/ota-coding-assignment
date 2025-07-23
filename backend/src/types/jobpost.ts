export type JobDescription = {
  name: string;
  value: string;
};

export type Position = {
  id: string;
  subcompany: string;
  office: string;
  department: string;
  recruitingCategory: string;
  name: string;
  jobDescriptions: {
    jobDescription: JobDescription[];
  };
  employmentType: string;
  seniority: string;
  schedule: string;
  yearsOfExperience: string;
  keywords: string;
  occupation: string;
  occupationCategory: string;
  createdAt: string;
};

export type WorkzagJobs = {
  'workzag-jobs': {
    position: Position[];
  };
};

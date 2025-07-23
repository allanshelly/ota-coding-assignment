import { PrismaClient } from '@prisma/client';
import { XMLParser } from 'fast-xml-parser';
import axios from 'axios';

const prisma = new PrismaClient();
const url = 'https://mrge-group-gmbh.jobs.personio.de/xml';

type JobDescription = {
  name: string;
  value: string;
};

type Position = {
  id: number;
  subcompany: string;
  office: string;
  additionalOffices?: {
    office: string[] | string;
  };
  department: string;
  recruitingCategory?: string;
  name: string;
  jobDescriptions: {
    jobDescription: JobDescription[] | JobDescription;
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

type WorkzagJobs = {
  'workzag-jobs': {
    position: Position[] | Position;
  };
};

async function main() {
  const { data } = await axios.get(url);
  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(data) as WorkzagJobs;

  const positions = Array.isArray(parsed['workzag-jobs'].position)
    ? parsed['workzag-jobs'].position
    : [parsed['workzag-jobs'].position];

  for (const p of positions) {
    const {
      id,
      subcompany,
      office,
      additionalOffices,
      department,
      recruitingCategory,
      name,
      jobDescriptions,
      employmentType,
      seniority,
      schedule,
      yearsOfExperience,
      keywords,
      occupation,
      occupationCategory,
      createdAt,
    } = p;

    // upsert
    await prisma.position.upsert({
      where: { id },
      update: {
        subcompany,
        office,
        department,
        recruitingCategory: recruitingCategory ?? null,
        name,
        employmentType,
        seniority,
        schedule,
        yearsOfExperience,
        keywords,
        occupation,
        occupationCategory,
        createdAt: new Date(createdAt),
      },
      create: {
        id,
        subcompany,
        office,
        department,
        recruitingCategory: recruitingCategory ?? null,
        name,
        employmentType,
        seniority,
        schedule,
        yearsOfExperience,
        keywords,
        occupation,
        occupationCategory,
        createdAt: new Date(createdAt),
        userId: 1
      },
    });

    // for rerun only
    await prisma.jobDescription.deleteMany({ where: { positionId: id } });
    await prisma.additionalOffice.deleteMany({ where: { positionId: id } });

    // for rerun only
    const descriptions = Array.isArray(jobDescriptions.jobDescription)
      ? jobDescriptions.jobDescription
      : [jobDescriptions.jobDescription];

    for (const jd of descriptions) {
      await prisma.jobDescription.create({
        data: {
          name: jd.name,
          value: jd.value,
          positionId: id,
        },
      });
    }

    // for rerun only
    const offices =
      typeof additionalOffices?.office === 'string'
        ? [additionalOffices.office]
        : additionalOffices?.office ?? [];

    for (const extraOffice of offices) {
      await prisma.additionalOffice.create({
        data: {
          name: extraOffice,
          positionId: id,
        },
      });
    }

    console.log(`Saved position: ${name}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

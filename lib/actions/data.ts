import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import {
  Company,
  Job,
  JobsApiResponse,
  Offer,
  OfferApiResponse,
  SalaryEstimate,
  SalaryApiResponse,
} from "../validation/types";
import {
  fetchAdzunaJobs,
  fetchAdzunaJobsByCompany,
  fetchAdzunaJobById,
  fetchAdzunaSalaryEstimates,
  fetchAdzunaSalaryEstimatesByCompany,
} from "./adzuna";

const ADZUNA_VIEWS_FALLBACK = 0;

function buildJobSearchTerm(search: string, levels: Set<string>): string {
  const levelKeyword = levels.size > 0 ? Array.from(levels)[0].toLowerCase().replace(/_/g, "-") : null;
  const parts = [search, levelKeyword].filter(Boolean);
  return parts.join(" ").trim() || "";
}

// ----- Jobs (Adzuna) -----

export async function fetchAllJobs(
  page: string,
  search: string,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  industry: Set<string>,
  resultSize: number | null
): Promise<JobsApiResponse> {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  // null = both tech + finance (default when no filter or both selected)
  const category =
    industry.size === 0 || (industry.has("Technology") && industry.has("Finance"))
      ? null
      : industry.has("Technology")
        ? "it-jobs"
        : industry.has("Finance")
          ? "accounting-finance-jobs"
          : null;
  const size = resultSize ?? 20;
  const levelKeyword = levels.size > 0 ? Array.from(levels)[0].toLowerCase().replace(/_/g, "-") : null;
  return fetchAdzunaJobs(pageNum, search, category, size, levelKeyword, sortBy, sortDir);
}

export async function fetchAllJobsByCompany(
  page: string,
  search: string,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  companyName: string,
  industry: Set<string>,
  resultSize: number | null
): Promise<JobsApiResponse> {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const category = industry.has("Technology") ? "it-jobs" : industry.has("Finance") ? "accounting-finance-jobs" : null;
  const size = resultSize ?? 20;
  const searchTerm = buildJobSearchTerm(search, levels);
  return fetchAdzunaJobsByCompany(pageNum, searchTerm, companyName, category, size);
}

export async function fetchJob(id: string): Promise<Job | null> {
  const job = await fetchAdzunaJobById(id);
  return job;
}

// ----- Salaries from job postings (Adzuna) - replaces Offers -----

export async function fetchAllOffers(
  page: string,
  search: string,
  _verified: number,
  _levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  _minYOE: number | null,
  _maxYOE: number | null,
  resultSize: number | null
): Promise<OfferApiResponse> {
  const salaryRes = await fetchAdzunaSalaryEstimates(
    Math.max(1, parseInt(page, 10) || 1),
    search,
    "it-jobs",
    resultSize ?? 20
  );
  return salaryEstimateToOfferApiResponse(salaryRes);
}

export async function fetchAllTechOffersByCompany(
  page: string,
  search: string,
  _verified: number,
  _levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  companyName: string,
  _minYOE: number | null,
  _maxYOE: number | null,
  resultSize: number | null
): Promise<OfferApiResponse> {
  const salaryRes = await fetchAdzunaSalaryEstimatesByCompany(
    Math.max(1, parseInt(page, 10) || 1),
    search,
    companyName,
    "it-jobs",
    resultSize ?? 20
  );
  return salaryEstimateToOfferApiResponse(salaryRes);
}

export async function fetchAllFinanceOffers(
  page: string,
  search: string,
  _verified: number,
  _levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  _minYOE: number | null,
  _maxYOE: number | null,
  resultSize: number | null
): Promise<OfferApiResponse> {
  const salaryRes = await fetchAdzunaSalaryEstimates(
    Math.max(1, parseInt(page, 10) || 1),
    search,
    "accounting-finance-jobs",
    resultSize ?? 20
  );
  return salaryEstimateToOfferApiResponse(salaryRes);
}

export async function fetchAllFinanceOffersByCompany(
  page: string,
  search: string,
  _verified: number,
  _levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  companyName: string,
  _minYOE: number | null,
  _maxYOE: number | null,
  resultSize: number | null
): Promise<OfferApiResponse> {
  const salaryRes = await fetchAdzunaSalaryEstimatesByCompany(
    Math.max(1, parseInt(page, 10) || 1),
    search,
    companyName,
    "accounting-finance-jobs",
    resultSize ?? 20
  );
  return salaryEstimateToOfferApiResponse(salaryRes);
}

function salaryEstimateToOfferApiResponse(res: SalaryApiResponse): OfferApiResponse {
  const offers: Offer[] = res.salaries.map((s) => ({
    rowId: s.id,
    verified: false,
    addedDate: s.addedDate,
    company: s.company,
    title: s.title,
    city: s.city,
    countryCode: s.countryCode,
    level: s.level,
    gender: undefined,
    ethnicity: undefined,
    other: undefined,
    arrangement: undefined,
    yoe: 0,
    sector: undefined,
    education: undefined,
    extra: undefined,
    rsu: 0,
    averageRsu: s.salaryAvg,
    offerYear: new Date().getFullYear(),
    baseSalaryCurrency: s.currency,
    signOnBonusCurrency: s.currency,
    annualBonusCurrency: s.currency,
    equityCurrency: s.currency,
    normTotalComp: s.salaryAvg,
    displayedTotalComp: s.salaryAvg,
    baseSalary: s.salaryMin,
    signOnBonus: 0,
    annualBonus: 0,
    vestingPeriod: 0,
    percentage: undefined,
    compDetails: {
      totalComp: s.formattedSalary.avg,
      base: s.formattedSalary.min,
      signOnBonus: "—",
      annualBonus: "—",
      averageRsu: "—",
    },
  }));
  return { offers, totalResults: res.totalResults };
}

export async function fetchOffer(id: string): Promise<Offer> {
  const job = await fetchAdzunaJobById(id);
  if (job) {
    const salaryRes = await fetchAdzunaSalaryEstimates(1, job.title, "it-jobs", 1);
    const match = salaryRes.salaries.find((s) => s.id === id);
    if (match) {
      const converted = salaryEstimateToOfferApiResponse({ salaries: [match], totalResults: 1 });
      return converted.offers[0];
    }
  }
  throw new Error("Offer not found");
}

export async function fetchFinanceOffer(id: string): Promise<Offer> {
  const salaryRes = await fetchAdzunaSalaryEstimates(1, "", "accounting-finance-jobs", 50);
  const match = salaryRes.salaries.find((s) => s.id === id);
  if (match) {
    const converted = salaryEstimateToOfferApiResponse({ salaries: [match], totalResults: 1 });
    return converted.offers[0];
  }
  throw new Error("Finance offer not found");
}

// ----- Company -----

export async function fetchCompanyByName(name: string): Promise<Company> {
  const decoded = decodeURIComponent(name).replace(/-/g, " ");
  const res = await fetchAdzunaJobsByCompany(1, "", decoded, null, 1);
  if (res.jobs.length > 0) {
    return res.jobs[0].company;
  }
  const domain =
    decoded
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "") + ".com";
  return { name: decoded, domain };
}

/** @deprecated Crunchbase removed. Returns minimal placeholder. */
export async function fetchCompanyData(company: string) {
  return { short_description: "", name: company, location_identifiers: [], linkedin: null };
}

// ----- Misc -----

export async function fetchViewers() {
  noStore();
  return { count: ADZUNA_VIEWS_FALLBACK };
}

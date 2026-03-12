import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { Company, Job, JobsApiResponse } from "../validation/types";
import { SalaryEstimate, SalaryApiResponse } from "../validation/types";

const ADZUNA_BASE = "https://api.adzuna.com/v1/api/jobs/gb";
const COUNTRY_CODE = "GB";
const CURRENCY = "GBP";

const APP_ID = process.env.ADZUNA_APP_ID || "";
const APP_KEY = process.env.ADZUNA_APP_KEY || "";

const LEVEL_KEYWORDS = [
  "intern",
  "junior",
  "graduate",
  "mid-level",
  "mid level",
  "senior",
  "principal",
  "lead",
  "staff",
  "director",
  "manager",
  "head of",
];

function deriveLevelFromTitle(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("intern") || lower.includes("internship")) return "Intern";
  if (lower.includes("graduate")) return "Junior";
  if (lower.includes("junior")) return "Junior";
  if (lower.includes("senior")) return "Senior";
  if (lower.includes("principal") || lower.includes("staff")) return "Principal";
  if (lower.includes("lead")) return "Senior";
  if (lower.includes("director") || lower.includes("head of")) return "Director";
  if (lower.includes("manager")) return "Director";
  if (lower.includes("mid-level") || lower.includes("mid level")) return "Mid-Level";
  return "Mid-Level";
}

function formatCurrency(value: number): string {
  if (value >= 1000) {
    return `£${(value / 1000).toFixed(0)}K`;
  }
  return `£${value}`;
}

interface AdzunaJobResult {
  id: string;
  title: string;
  description: string;
  salary_min?: number;
  salary_max?: number;
  location?: { display_name: string; area?: string[] };
  company?: { display_name: string };
  redirect_url: string;
  created: string;
  category?: { label: string; tag: string };
}

interface AdzunaSearchResponse {
  results: AdzunaJobResult[];
  count?: number;
}

function mapAdzunaToJob(r: AdzunaJobResult): Job {
  const city = r.location?.display_name?.split(",")[0]?.trim() || "UK";
  const companyName = r.company?.display_name || "Unknown Company";
  const domain =
    companyName
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "") + ".com";

  return {
    jobId: r.id,
    title: r.title,
    description: r.description || "",
    city,
    countryCode: COUNTRY_CODE,
    company: { name: companyName, domain },
    level: deriveLevelFromTitle(r.title),
    addedDate: new Date(r.created),
    link: r.redirect_url,
    industry: r.category?.label || "Technology",
    sponsoredJob: false,
  };
}

function mapAdzunaToSalaryEstimate(r: AdzunaJobResult): SalaryEstimate {
  const salaryMin = r.salary_min ?? 0;
  const salaryMax = r.salary_max ?? 0;
  const salaryAvg = salaryMin && salaryMax ? Math.round((salaryMin + salaryMax) / 2) : salaryMin || salaryMax;

  const city = r.location?.display_name?.split(",")[0]?.trim() || "UK";
  const companyName = r.company?.display_name || "Unknown Company";
  const domain =
    companyName
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "") + ".com";

  return {
    id: r.id,
    company: { name: companyName, domain },
    title: r.title,
    city,
    countryCode: COUNTRY_CODE,
    level: deriveLevelFromTitle(r.title),
    salaryMin,
    salaryMax,
    salaryAvg,
    currency: "GBP" as const,
    category: r.category?.tag || "it-jobs",
    addedDate: new Date(r.created),
    formattedSalary: {
      min: salaryMin ? formatCurrency(salaryMin) : "—",
      max: salaryMax ? formatCurrency(salaryMax) : "—",
      avg: salaryAvg ? formatCurrency(salaryAvg) : "—",
    },
    link: r.redirect_url,
  };
}

async function fetchAdzuna(path: string, params: Record<string, string | number>): Promise<AdzunaSearchResponse> {
  noStore();
  const searchParams = new URLSearchParams();
  searchParams.set("app_id", APP_ID);
  searchParams.set("app_key", APP_KEY);
  searchParams.set("content-type", "application/json");
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== "") searchParams.set(k, String(v));
  }

  const url = `${ADZUNA_BASE}${path}?${searchParams}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Adzuna API error: ${res.status}`);
  }

  return res.json();
}

const TECH_FINANCE_CATEGORIES = ["it-jobs", "accounting-finance-jobs"] as const;

export async function fetchAdzunaJobs(
  page: number,
  search: string,
  category: string | null,
  resultsPerPage: number = 20,
  levelKeyword: string | null = null,
  sortBy: string | null = null,
  sortDir: string | null = null
): Promise<JobsApiResponse> {
  if (!APP_ID || !APP_KEY) {
    return { jobs: [], totalResults: 0 };
  }

  // When no category = show only tech + finance (default)
  const categories = category ? [category] : [...TECH_FINANCE_CATEGORIES];

  if (categories.length === 1) {
    return fetchAdzunaJobsSingle(page, search, categories[0], resultsPerPage, levelKeyword, sortBy, sortDir);
  }

  // Dual category: fetch both, merge, sort, paginate
  const perCategory = Math.ceil(resultsPerPage / categories.length);
  const [techRes, financeRes] = await Promise.all([
    fetchAdzunaJobsSingle(page, search, "it-jobs", perCategory, levelKeyword, sortBy, sortDir),
    fetchAdzunaJobsSingle(page, search, "accounting-finance-jobs", perCategory, levelKeyword, sortBy, sortDir),
  ]);

  const seen = new Set<string>();
  const merged = [...techRes.jobs, ...financeRes.jobs]
    .filter((j) => {
      if (seen.has(j.jobId)) return false;
      seen.add(j.jobId);
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "addedDate" && sortDir) {
        const t = b.addedDate.getTime() - a.addedDate.getTime();
        return sortDir === "desc" ? t : -t;
      }
      return 0;
    })
    .slice(0, resultsPerPage);

  return {
    jobs: merged,
    totalResults: (techRes.totalResults || 0) + (financeRes.totalResults || 0),
  };
}

async function fetchAdzunaJobsSingle(
  page: number,
  search: string,
  category: string,
  resultsPerPage: number,
  levelKeyword: string | null,
  sortBy: string | null,
  sortDir: string | null
): Promise<JobsApiResponse> {
  const path = `/search/${page}`;
  const params: Record<string, string | number> = {
    results_per_page: resultsPerPage,
    category,
  };
  const whatParts = [search, levelKeyword].filter(Boolean);
  if (whatParts.length > 0) params.what = whatParts.join(" ");
  if (sortBy === "addedDate" && sortDir) {
    params.sort_by = "date";
    params.sort_direction = sortDir === "desc" ? "down" : "up";
  } else if (sortBy === "salary" && sortDir) {
    params.sort_by = "salary";
    params.sort_direction = sortDir === "desc" ? "down" : "up";
  }

  const data = await fetchAdzuna(path, params);
  const jobs = (data.results || []).map(mapAdzunaToJob);
  const totalResults = data.count ?? jobs.length;
  return { jobs, totalResults };
}

export async function fetchAdzunaJobsByCompany(
  page: number,
  search: string,
  companyName: string,
  category: string | null,
  resultsPerPage: number = 20
): Promise<JobsApiResponse> {
  if (!APP_ID || !APP_KEY) {
    return { jobs: [], totalResults: 0 };
  }

  const what = search ? `${companyName} ${search}`.trim() : companyName;
  const categories = category ? [category] : [...TECH_FINANCE_CATEGORIES];

  if (categories.length === 1) {
    return fetchAdzunaJobsByCompanySingle(page, what, categories[0], resultsPerPage);
  }

  const perCategory = Math.ceil(resultsPerPage / 2);
  const [techRes, financeRes] = await Promise.all([
    fetchAdzunaJobsByCompanySingle(page, what, "it-jobs", perCategory),
    fetchAdzunaJobsByCompanySingle(page, what, "accounting-finance-jobs", perCategory),
  ]);

  const seen = new Set<string>();
  const merged = [...techRes.jobs, ...financeRes.jobs]
    .filter((j) => {
      if (seen.has(j.jobId)) return false;
      seen.add(j.jobId);
      return true;
    })
    .sort((a, b) => b.addedDate.getTime() - a.addedDate.getTime())
    .slice(0, resultsPerPage);

  return {
    jobs: merged,
    totalResults: (techRes.totalResults || 0) + (financeRes.totalResults || 0),
  };
}

async function fetchAdzunaJobsByCompanySingle(
  page: number,
  what: string,
  category: string,
  resultsPerPage: number
): Promise<JobsApiResponse> {
  const path = `/search/${page}`;
  const params: Record<string, string | number> = {
    results_per_page: resultsPerPage,
    category,
    what,
  };

  const data = await fetchAdzuna(path, params);
  const jobs = (data.results || []).map(mapAdzunaToJob);
  const totalResults = data.count ?? jobs.length;
  return { jobs, totalResults };
}

export async function fetchAdzunaSalaryEstimates(
  page: number,
  search: string,
  category: string | null,
  resultsPerPage: number = 20
): Promise<SalaryApiResponse> {
  if (!APP_ID || !APP_KEY) {
    return { salaries: [], totalResults: 0 };
  }

  const categories = category ? [category] : [...TECH_FINANCE_CATEGORIES];

  if (categories.length === 1) {
    return fetchAdzunaSalaryEstimatesSingle(page, search, categories[0], resultsPerPage);
  }

  const perCategory = Math.ceil(resultsPerPage / 2);
  const [techRes, financeRes] = await Promise.all([
    fetchAdzunaSalaryEstimatesSingle(page, search, "it-jobs", perCategory),
    fetchAdzunaSalaryEstimatesSingle(page, search, "accounting-finance-jobs", perCategory),
  ]);

  const seen = new Set<string>();
  const merged = [...techRes.salaries, ...financeRes.salaries]
    .filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    })
    .sort((a, b) => b.salaryAvg - a.salaryAvg)
    .slice(0, resultsPerPage);

  return {
    salaries: merged,
    totalResults: (techRes.totalResults || 0) + (financeRes.totalResults || 0),
  };
}

async function fetchAdzunaSalaryEstimatesSingle(
  page: number,
  search: string,
  category: string,
  resultsPerPage: number
): Promise<SalaryApiResponse> {
  const path = `/search/${page}`;
  const params: Record<string, string | number> = {
    results_per_page: resultsPerPage,
    category,
    sort_by: "salary",
    sort_direction: "down",
  };
  if (search) params.what = search;

  const data = await fetchAdzuna(path, params);
  const salaries = (data.results || [])
    .filter((r: AdzunaJobResult) => r.salary_min || r.salary_max)
    .map(mapAdzunaToSalaryEstimate);
  const totalResults = data.count ?? salaries.length;
  return { salaries, totalResults };
}

export async function fetchAdzunaSalaryEstimatesByCompany(
  page: number,
  search: string,
  companyName: string,
  category: string | null,
  resultsPerPage: number = 20
): Promise<SalaryApiResponse> {
  if (!APP_ID || !APP_KEY) {
    return { salaries: [], totalResults: 0 };
  }

  const what = search ? `${companyName} ${search}`.trim() : companyName;
  const categories = category ? [category] : [...TECH_FINANCE_CATEGORIES];

  if (categories.length === 1) {
    return fetchAdzunaSalaryEstimatesByCompanySingle(page, what, categories[0], resultsPerPage);
  }

  const perCategory = Math.ceil(resultsPerPage / 2);
  const [techRes, financeRes] = await Promise.all([
    fetchAdzunaSalaryEstimatesByCompanySingle(page, what, "it-jobs", perCategory),
    fetchAdzunaSalaryEstimatesByCompanySingle(page, what, "accounting-finance-jobs", perCategory),
  ]);

  const seen = new Set<string>();
  const merged = [...techRes.salaries, ...financeRes.salaries]
    .filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    })
    .sort((a, b) => b.salaryAvg - a.salaryAvg)
    .slice(0, resultsPerPage);

  return {
    salaries: merged,
    totalResults: (techRes.totalResults || 0) + (financeRes.totalResults || 0),
  };
}

async function fetchAdzunaSalaryEstimatesByCompanySingle(
  page: number,
  what: string,
  category: string,
  resultsPerPage: number
): Promise<SalaryApiResponse> {
  const path = `/search/${page}`;
  const params: Record<string, string | number> = {
    results_per_page: resultsPerPage,
    category,
    what,
    sort_by: "salary",
    sort_direction: "down",
  };

  const data = await fetchAdzuna(path, params);
  const salaries = (data.results || [])
    .filter((r: AdzunaJobResult) => r.salary_min || r.salary_max)
    .map(mapAdzunaToSalaryEstimate);
  const totalResults = data.count ?? salaries.length;
  return { salaries, totalResults };
}

export async function fetchAdzunaJobById(id: string): Promise<Job | null> {
  if (!APP_ID || !APP_KEY) return null;

  try {
    for (const category of TECH_FINANCE_CATEGORIES) {
      const path = `/search/1`;
      const params: Record<string, string | number> = { category, what: id, results_per_page: 20 };
      const data = await fetchAdzuna(path, params);
      const match = data.results?.find((r: AdzunaJobResult) => r.id === id);
      if (match) return mapAdzunaToJob(match);
    }
  } catch {
    // ignore
  }
  return null;
}

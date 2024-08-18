import "server-only"
import { Offer, Company, OfferApiResponse, Job, JobsApiResponse} from "./types"
import { unstable_noStore as noStore } from "next/cache"
import { formatter, memoize } from "./utils"
import { URLSearchParams } from "url"

const API_URL = process.env.API_V2_URL || ""
const OFFERS_API = API_URL + "/offers"
const FINANCE_API = API_URL + "/finance"
const JOBS_API = API_URL + "/jobs"

const CRUNCHBASE_API_URL = process.env.CRUNCHBASE_API
const CRUNCHBASE_API_PARAMS = process.env.CRUNCHBASE_PARAMS

const LEVEL_MAPPER = {
  INTERN: "Intern",
  JUNIOR: "Junior",
  MID_LEVEL: "Mid-Level",
  SENIOR: "Senior",
  PRINCIPAL: "Principal",
  DIRECTOR: "Director",
}

export async function fetchCompanyData(company: string) {
  const response = await fetch(
      `${CRUNCHBASE_API_URL}/${company}?${CRUNCHBASE_API_PARAMS}`
  );

  if (!response.ok) {
      throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  return data.properties;
}

export async function fetchAllOffers(
  page: string,
  search: string,
  verified: number,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null
): Promise<OfferApiResponse> {
  const params = getUrlParams(page, search, verified, levels, sortBy, sortDir)

  const res = await fetchApiWithParams(params)
  res.offers.map((o) => formatOffer(o))

  return res
}

export async function fetchAllTechOffersByCompany(
  page: string,
  search: string,
  verified: number,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  companyName: string
): Promise<OfferApiResponse> {
  const params = getUrlParams(page, search, verified, levels, sortBy, sortDir)

  const res = await fetchApiWithParamsForCompany(params, companyName)
  res.offers.map((o) => formatOffer(o))

  return res
}

export async function fetchAllFinanceOffers(
  page: string,
  search: string,
  verified: number,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null
): Promise<OfferApiResponse> {
  const params = getUrlParams(page, search, verified, levels, sortBy, sortDir)

  const res = await fetchFinanceApiWithParams(params)
  res.offers.map((o) => formatOffer(o))

  return res
}

export async function fetchAllFinanceOffersByCompany(
  page: string,
  search: string,
  verified: number,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  companyName: string
): Promise<OfferApiResponse> {
  const params = getUrlParams(page, search, verified, levels, sortBy, sortDir)

  const res = await fetchApiWithParamsForFinanceCompany(params, companyName)
  res.offers.map((o) => formatOffer(o))

  return res
}

export async function fetchOffer(id: string): Promise<Offer> {
  const apiOffer: Offer = await fetch(
    `${process.env.API_V2_URL}/offers/${id}`
  ).then((res) => res.json())

  const offer = formatOffer(apiOffer)

  return offer
}

export async function fetchCompanyByName(name: string): Promise<Company> {
  const apiUrl = `${process.env.API_V2_URL}/company?name=${name}`;
  try {
      const companies: Company[] = await fetch(apiUrl).then((res) => res.json());

      if (companies.length > 0) {
          const company = companies[0];
          return company;
      } else {
          throw new Error("Company not found");
      }
  } catch (error) {
      throw new Error("Error fetching company data");
  }
}



export async function fetchFinanceOffer(id: string): Promise<Offer> {
  const apiOffer: Offer = await fetch(
    `${process.env.API_V2_URL}/finance/offer/${id}`
  ).then((res) => res.json())

  const offer = formatOffer(apiOffer)

  return offer
}

async function fetchApiWithParams(
  urlParams: URLSearchParams
): Promise<OfferApiResponse> {
  noStore()
  return fetch(`${OFFERS_API}?${urlParams}`).then((res) => res.json())
}

async function fetchApiWithParamsForCompany(
  urlParams: URLSearchParams, companyName: string
): Promise<OfferApiResponse> {
  noStore()
  return fetch(`${OFFERS_API}/company/${companyName}?${urlParams}`).then((res) => res.json())
}

async function fetchApiWithParamsForFinanceCompany(
  urlParams: URLSearchParams, companyName: string
): Promise<OfferApiResponse> {
  noStore()
  return fetch(`${FINANCE_API}/${companyName}?${urlParams}`).then((res) => res.json())
}

async function fetchFinanceApiWithParams(
  urlParams: URLSearchParams
): Promise<OfferApiResponse> {
  noStore()
  return fetch(`${FINANCE_API}?${urlParams}`).then((res) => res.json())
}

function getUrlParams(
  page: string,
  search: string,
  verified: number,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null
): URLSearchParams {
  const params = new URLSearchParams()
  params.append("page", page)
  params.append("search", search)
  if (verified) params.append("verified", "1")
  levels.forEach((l) => params.append("levels", l))

  if (sortBy === "totalComp" && (sortDir === "asc" || sortDir == "desc")) {
    params.append("sortBy", "normTotalComp")
    params.append("sortDir", sortDir)
  }

  return params
}

function formatOffer(offer: Offer): Offer {
  offer.addedDate = new Date(offer.addedDate)
  offer.level = LEVEL_MAPPER[offer.level as keyof typeof LEVEL_MAPPER]
  // const totalComp =
  //   offer.baseSalary + offer.signOnBonus + offer.annualBonus + offer.rsu

  offer.compDetails = {
    totalComp: memoFormatter(offer.baseSalaryCurrency).format(
      offer.displayedTotalComp
    ),
    base: memoFormatter(offer.baseSalaryCurrency).format(offer.baseSalary),
    signOnBonus: memoFormatter(offer.signOnBonusCurrency).format(
      offer.signOnBonus
    ),
    annualBonus: memoFormatter(offer.annualBonusCurrency).format(
      offer.annualBonus
    ),
    averageRsu: memoFormatter(offer.equityCurrency || offer.baseSalaryCurrency).format(
      offer.averageRsu
    ),
  }

  return offer
}

const memoFormatter = memoize(formatter)

// jobs data below

const JOB_TYPE_MAPPER = {
  TECHNOLOGY: "Technology",
  FINANCE: "Finance",
}

function formatJob(job: Job): Job {
  job.addedDate = new Date(job.addedDate)
  job.level = LEVEL_MAPPER[job.level as keyof typeof LEVEL_MAPPER]
  job.industry = JOB_TYPE_MAPPER[job.industry as keyof typeof JOB_TYPE_MAPPER]

  return job
}

async function fetchJobsApiWithParams(
  urlParams: URLSearchParams
): Promise<JobsApiResponse> {
  noStore()
  return fetch(`${JOBS_API}?${urlParams}`).then((res) => res.json())
}

function getUrlParamsForJob(
  page: string,
  search: string,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  industry: Set<string>
): URLSearchParams {
  const params = new URLSearchParams()
  params.append("page", page)
  params.append("search", search)
  levels.forEach((l) => params.append("levels", l))
  industry.forEach((i) => params.append("industries", i))

  if (sortBy === "addedDate" && (sortDir === "asc" || sortDir == "desc")) {
    params.append("sortBy", "addedDate")
    params.append("sortDir", sortDir)
  }

  return params
}

export async function fetchAllJobs(
  page: string,
  search: string,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  industry: Set<string>
): Promise<JobsApiResponse> {
  const params = getUrlParamsForJob(page, search, levels, sortBy, sortDir, industry)

  const res = await fetchJobsApiWithParams(params)
  res.jobs.map((o) => formatJob(o))

  return res
}

async function fetchApiWithParamsForCompanyJobs(
  urlParams: URLSearchParams, companyName: string
): Promise<JobsApiResponse> {
  noStore()
  return fetch(`${JOBS_API}/company/${companyName}?${urlParams}`).then((res) => res.json())
}

export async function fetchJob(id: string): Promise<Job> {
  const apiJob: Job = await fetch(
    `${process.env.API_V2_URL}/jobs/${id}`
  ).then((res) => res.json())

  const job = formatJob(apiJob)

  return job
}

export async function fetchAllJobsByCompany(
  page: string,
  search: string,
  levels: Set<string>,
  sortBy: string | null,
  sortDir: string | null,
  companyName: string,
  industry: Set<string>
): Promise<JobsApiResponse> {
  const params = getUrlParamsForJob(page, search, levels, sortBy, sortDir, industry)

  const res = await fetchApiWithParamsForCompanyJobs(params, companyName)
  res.jobs.map((o) => formatJob(o))

  return res
}
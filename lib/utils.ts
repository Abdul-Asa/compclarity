import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationObject, ApplicationSorted, CurrencyCode, Func } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const range: (start: number, end: number) => number[] = (start, end) => {
  if (start >= end) {
    return [];
  }

  return [...Array(end - start + 1).keys()].map((key: number): number => key + start);
};

export const memoize = <T = any>(fn: Func<T>) => {
  const cache = new Map();
  const cached = function (this: any, val: T) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

export const formatter = (currency: CurrencyCode): Intl.NumberFormat => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const dateFormatter = (date: string): string => {
  if (!date) return new Date().toLocaleDateString("en-UK");
  return new Date(date).toLocaleDateString("en-UK");
};

// Sorts applications by todo_level into an object
export const sortApplications = (applications: ApplicationObject[]): ApplicationSorted => {
  const sortedByTodoLevel = applications.reduce((acc: ApplicationSorted, application) => {
    if (!acc[application.todo_level]) {
      acc[application.todo_level] = [];
    }
    acc[application.todo_level].push(application);
    return acc;
  }, {});

  return sortedByTodoLevel;
};

// Returns a snapshot of the kanban board (The order of each application in the kanban board)
export const getKanbanSnapshot = (sortedApplications: ApplicationSorted): ApplicationObject[] => {
  const snapshot: ApplicationObject[] = [];

  for (const todo_level in sortedApplications) {
    sortedApplications[todo_level].forEach((application, index) => {
      snapshot.push({
        ...application,
        kanban_order: index,
      });
    });
  }

  return snapshot;
};

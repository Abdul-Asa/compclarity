import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationObject, ApplicationSorted, CurrencyCode, Func } from "../validation/types";
import React from "react";

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

// Returns a date in UK format
export const dateFormatter = (date: string): string => {
  if (!date) return new Date().toLocaleDateString("en-UK");
  return new Date(date).toLocaleDateString("en-UK");
};

// Returns a date in UK format
export const newDateFormatter = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  if (!date) return new Date().toLocaleDateString("en-UK", options);
  return new Date(date).toLocaleDateString("en-UK", options);
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

// Returns a string of the bytes in a more readable format
export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? (accurateSizes[i] ?? "Bytest") : (sizes[i] ?? "Bytes")
  }`;
}
/**
 * Converts a string to a URL-friendly format by replacing spaces with hyphens
 * and converting to lowercase.
 * @param str - The string to convert.
 * @returns The URL-friendly string.
 */
export function toUrlFriendly(str: string): string {
  return str
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase(); // Convert to lowercase
}

/**
 * Converts a URL-friendly string back to a regular string by replacing hyphens
 * with spaces and capitalizing the first letter of each word.
 * @param str - The URL-friendly string to convert.
 * @returns The regular string.
 */
export function fromUrlFriendly(str: string): string {
  return str
    .split("-") // Split by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join back with spaces
}

export const capitalize = (...strings: string[]): string => {
  return strings.map((str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(" ");
};

type Object = { [key: string]: any };

const isObject = (item: any): item is Object => {
  return item && typeof item === "object" && !Array.isArray(item);
};

/**
 * Deep merge two objects by overriding target with fields in source.
 * It returns a new object and doesn't modify any object in place since
 * it deep clones the target object first.
 */
export const deepMerge = (target: Object, source: Object, level = 0) => {
  const copyTarget = level === 0 ? structuredClone(target) : target;
  for (const key in source) {
    const sourceValue = source[key];
    // Assign source value to copyTarget if source value is not an object.
    // Otherwise, call deepMerge recursively to merge all its keys
    if (!isObject(sourceValue)) {
      copyTarget[key] = sourceValue;
    } else {
      if (!isObject(copyTarget[key])) {
        copyTarget[key] = {};
      }
      deepMerge(copyTarget[key], sourceValue, level + 1);
    }
  }
  return copyTarget;
};

export const getPxPerRem = () => {
  const bodyComputedStyle = getComputedStyle(document.querySelector("body")!) as any;
  return parseFloat(bodyComputedStyle["font-size"]) || 16;
};

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs);
}

export function formatDate(dateString?: string) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export { composeRefs, useComposedRefs };

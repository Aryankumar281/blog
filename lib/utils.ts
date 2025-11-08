import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLocaleLowerCase()
    .replace(/[^a-z0-9 ]+/g, "")
    .replace(/ +/g, "-");
}


export function formatDate(date:Date):string{
  return new Intl.DateTimeFormat('en-US',{
    month:"short",
    day:'numeric',
    year:'numeric'
  }).format(date)
}
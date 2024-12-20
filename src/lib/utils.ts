import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  const formattedDate = format(date, 'MMM dd, yyyy');
  return formattedDate
};
export const formatDateMessage = (date: Date) => {
  const formattedDate = format(date, 'M/d/yyyy, h:mm a');
  return formattedDate
};

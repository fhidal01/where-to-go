import { Period } from './Period.model';

export interface OpeningHours {
  open_now: boolean;
}
export interface DetailedOpeningHours {
  open_now: boolean;
  periods: Period[];
  weekday_text: string[];
}

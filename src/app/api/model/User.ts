export interface User {
  aboutMe: string;
  avatar: string;
  avatar150: string;
  avatar640: string;
  city: string;
  clockTimeDisplayFormat: ClockTimeDisplayFormat;
  country: string;
  dateOfBirth: string;
  displayName: string;
  distanceUnit: string;
  encodedId: string;
  foodsLocale: string;
  fullName: string;
  gender: Gender;
  glucoseUnit: string;
  height: string;
  heightUnit: string;
  locale: string;
  memberSince: string;
  offsetFromUTCMillis: string;
  startDayOfWeek: string;
  state: string;
  strideLengthRunning: string;
  strideLengthWalking: string;
  timezone: string;
  waterUnit: string;
  weight: string;
  weightUnit: string;
}

export type ClockTimeDisplayFormat = '12hour' | '24hour';
export type Gender = 'FEMALE' | 'MALE' | 'NA';

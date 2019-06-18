export class Heartrate {
  activitiesHeartIntraday: ActivityHeartIntraDay;
  activitiesHeartDay: ActivityHeart[];

  constructor(activitiesHeart: ActivityHeart[], activitesHeartIntraday: ActivityHeartIntraDay) {
    this.activitiesHeartDay = activitiesHeart;
    this.activitiesHeartIntraday = activitesHeartIntraday;
  }
}

export interface ActivityHeart {
  dateTime: string; // yyyy-MM-dd or 'today'
  value: HeartActivity [];
}

export interface HeartActivity {
  heartRateZones: HeartrateZone[];
  customHeartRateZones: any[];
}

export interface HeartrateZone {
  caloriesOut: number;
  max: number;
  min: number;
  minutes: number;
  name: HeartrateZoneType;
}

export interface ActivityHeartIntraDay {
  dataset: DataPoint[];
  datasetInterval: number;
  datasetType: DataSetType;
}

export interface DataPoint {
  time: string;
  value: number;
}

export type DataSetType = 'second' | 'minute';

export type HeartrateZoneType = 'Out of Range' | 'Cardio' | 'Fat Burn' | 'Peak';

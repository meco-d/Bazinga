export interface Station {
  id: number;
  latitude: number;
  longitude: number;
  name?: string;
  country?: string;
  city?: string;
  streetName?: string;
  fastAvailable?: number;
  slowAvailable?: number;
  distance?: string;
  route?: any;
  chargerList?: Charger[];
  type?: ChargerType;
}

export interface Charger{
  charging_station_id: 4,
  id: 9,
  status: ChargerStatus,
  type: ChargerType,
  rated_power: string,
}

export enum ChargerStatus {
  IN_USE="In use",
  FREE="Free",
  BROKEN="Broken",
  UNDER_MAINTENANCE="Under maintenance"
}
export enum ChargerType {
  ONE_PHASE = 'One-Phase',
  THREE_PHASE = 'Three-Phase',
}

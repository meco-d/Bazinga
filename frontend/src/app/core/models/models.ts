export interface Station {
  lat: number;
  lng: number;
  name?: string;
  streetName?: string;
  fastAvailable?: number;
  slowAvailable?: number;
  distance?: string;
  route?: any;
}

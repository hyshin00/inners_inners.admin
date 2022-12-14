declare namespace Management {
  interface MobileRssi {
    id: number;
    deviceModel: string;
    osVersioin: number | null;
    rssiCal: number | null;
    deviceName: string;
    createdTime: Date;
    type: string;
  }
}

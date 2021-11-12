export type DangerReports = Array<InformationNode>;
export type EspDangerReports = Array<EspData>;
export type LocalDangerReports = Array<LocalInformationNode>;

// Data sent by the ESP, to be converted to LocalInformationNode before storing to db
// Timestamp only refers to the time
// We must then convert the date to timestamp to havbe the complete timestamp
export type EspData = Omit<InformationNode, 'timestamp'> & {
  date: string; // format ISO
};

// Timestamp here refers to the complete timestamp
export type InformationNode = {
  timestamp: number;
  distance: number;
  object_speed: number;
  bicycle_speed: number;
  latitude: number;
  longitude: number;
};

export type LocalInformationNode = InformationNode & {
  id: number;
  sync: boolean;
};

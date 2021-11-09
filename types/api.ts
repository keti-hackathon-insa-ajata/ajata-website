export type DangerReports = Array<InformationNode>;
export type LocalDangerReports = Array<LocalInformationNode>;

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

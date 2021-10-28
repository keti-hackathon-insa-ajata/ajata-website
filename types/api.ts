export type ApiResponse = Array<InformationNode>;

export type InformationNode = {
  timestamp: number;
  distance: number;
  object_speed: number;
  bicycle_speed: number;
  latitude: number;
  longitude: number;
};

export interface T_AUTH_RESP {
  sessiontoken: string;
  profileId: string;
  status: string;
}

export interface T_Profile {
  firstName: string;
  lastName: string;
  displayName: null;
  profileId: string;
  email: string;
  status: string;
  accountNumber: string;
  parentalControlEnabled: boolean;
  parentalPin: null;
  parentalRatingLevel: string;
  blockAdultContent: boolean;
  receiveMarketingEmail: boolean;
  associated: boolean;
  type: string;
}

export interface T_Device {
  product: string;
  deviceId: string;
  profileId: string;
  alias: string;
  dateRegistered: Date;
  enabled: boolean;
}

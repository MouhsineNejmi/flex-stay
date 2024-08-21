export enum AuthEvent {
  CREATE_USER = 'create_user',
  LOGIN_USER = 'login_user',
}

export type AUTH_TOPIC_TYPE = 'AuthEvents';

export interface AuthMessageType {
  headers?: Record<string, unknown>;
  event: AuthEvent;
  data: Record<string, unknown>;
}

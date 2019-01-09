export interface ILiveEvent {
  id: string;
  created: number;

  name: string;
  description: string;

  finished: boolean;
  started: boolean;

  secured: boolean;
  securedKey: string | null;
}

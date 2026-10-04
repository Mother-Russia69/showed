// Database shape from SPEC.md; no storage integration yet.
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  created_at: string;
}
export interface Claim {
  id: string;
  event_id: string;
  wallet: string;
  signature: string;
  created_at: string;
}

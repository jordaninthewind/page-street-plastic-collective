export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
}

export interface Event {
  id: string;
  name?: string;
  description?: string;
  created_at: string;
  covered?: boolean;
  cover_id?: string;
  type?: string;
  reported_by?: string;
}

export interface Comment {
  id: string;
  text: string;
  created_at: string;
  name: string;
  cover_id: string;
}

export interface Cover {
  id: string;
  created_at: string;
  covered: boolean;
  lat: number;
  lng: number;
  requested_by: string;
  address: string;
  events: Event[];
  comments: Comment[];
}

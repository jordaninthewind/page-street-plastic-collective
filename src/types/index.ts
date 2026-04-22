export interface User {
  password: string;
  email: string;
  name: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  created_at: string;
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
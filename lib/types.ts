export interface HomeContent {
  title: string;
  intro: string;
  heroImageUrl?: string;
}

export interface TextPageContent {
  title: string;
  body: string;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  order?: number;
}

export interface Player {
  id: string;
  name: string;
  photoUrl?: string;
  bio?: string;
  order?: number;
}

export interface Coach {
  id: string;
  name: string;
  photoUrl?: string;
  bio?: string;
  order?: number;
}

export interface TeamGroup {
  id: string;
  league: string;
  description?: string;
  photos: string[];
  order?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  location?: string;
}

export interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  openingHours?: string;
}

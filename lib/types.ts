export interface HomeContent {
  title: string;
  intro: string;
  heroImageUrl?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
}

export interface NewsPost {
  id: string;
  title: string;
  body: string;
  date: string;
  order?: number;
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
  nickname?: string;
  birthYear?: string;
  squashSince?: string;
  achievements?: string;
  bio?: string;
  order?: number;
}

export interface Coach {
  id: string;
  name: string;
  photoUrl?: string;
  nickname?: string;
  birthYear?: string;
  squashSince?: string;
  achievements?: string;
  bio?: string;
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

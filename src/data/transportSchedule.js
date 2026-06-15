/**
 * Optimised date schedule — Auckland (RTDB-Auckland) → Melbourne (Lantern pins)
 * Uses RTDB rotation/refresh cadence to time-check departures before each leg.
 */

import rtdbConfig from './rtdb-config.json';

export const RTDB = rtdbConfig;

export const TIMEZONE = {
  auckland: 'Pacific/Auckland',
  melbourne: 'Australia/Melbourne',
  juneOffsetHours: -2,
  note: 'June: Auckland is 2h ahead of Melbourne — land earlier local time than you departed'
};

export const MELBOURNE_TRANSIT = {
  airportToCbd: {
    mode: 'SkyBus / rideshare',
    pin: 'MEL',
    minutes: 35,
    bufferMinutes: 15,
    note: 'Melbourne T1 → Southern Cross / Flinders area'
  },
  flindersToDegraves: {
    mode: 'Walk via Flinders Lane',
    pin: 'FLINDERS',
    walkMinutes: 4,
    tramOptional: 'City Circle to Flinders St — exit toward Degraves',
    note: 'Date meet: Flinders Lane end per cook-off checklist'
  },
  degravesToKitchen: {
    mode: 'Walk / tram 1 stop',
    pin: 'DEGRAVES',
    minutes: 12,
    note: 'Flat white to-go → home/Airbnb kitchen for cook-off'
  },
  lastTramBuffer: {
    mode: 'Night Network Fri/Sat or rideshare',
    minutes: 25,
    note: 'After cook-off — do not miss last leg; Bard: no invoice for ride'
  }
};

/** Optimised pilgrimage + date night (19–22 June 2026 context) */
export const DATE_SCHEDULE = [
  {
    id: 'akl-check',
    day: 'Travel −1 or morning of',
    city: 'Auckland',
    time: '05:30',
    tz: TIMEZONE.auckland,
    title: 'RTDB refresh — Waitemata trains',
    rtdbLocation: 'waitemata',
    transport: { mode: 'train', icon: '🚆', board: 'Waitemata Station' },
    action: 'Open RTDB rotation — confirm next Britomart-bound train within 30 min refresh window',
    bufferMin: 0,
    pin: null,
    skill: 'flame-kissed-bard'
  },
  {
    id: 'akl-bus',
    day: 'Travel morning',
    city: 'Auckland',
    time: '06:15',
    tz: TIMEZONE.auckland,
    title: 'Britomart bus hub — airport connector',
    rtdbLocation: 'britomart',
    transport: { mode: 'bus', icon: '🚌', board: 'Britomart Bus Hub', routes: '380 / SkyBus / airport services' },
    action: 'RTDB 45s rotation to Britomart — pick earliest ≤20 min wait; 2+ RED FLAGS on ride-share = Helen abort',
    bufferMin: 20,
    pin: null,
    skill: 'helen-neighbor'
  },
  {
    id: 'flight',
    day: 'Travel day',
    city: 'AKL → MEL',
    time: '09:00',
    tz: TIMEZONE.auckland,
    title: 'Flight AKL → MEL',
    transport: { mode: 'flight', icon: '✈️', durationMin: 240 },
    action: 'Buffer 90 min at AKL after bus arrival; timezone −2h on landing',
    bufferMin: 90,
    pin: 'MEL',
    skill: 'asuka-brisbane'
  },
  {
    id: 'mel-arrive',
    day: 'Date day',
    city: 'Melbourne',
    time: '12:30',
    tz: TIMEZONE.melbourne,
    title: 'MEL T1 → CBD check-in',
    transport: MELBOURNE_TRANSIT.airportToCbd,
    action: 'Drop bags at accommodation (HOTEL pin) — no love-bomb speedrun before shower',
    bufferMin: MELBOURNE_TRANSIT.airportToCbd.bufferMinutes,
    pin: 'MEL',
    skill: 'flame-kissed-bard'
  },
  {
    id: 'mel-rest',
    day: 'Date day',
    city: 'Melbourne',
    time: '15:00',
    tz: TIMEZONE.melbourne,
    title: 'TTMIK shadowing + quest sync',
    transport: { mode: 'rest', icon: '🏨' },
    action: 'Skills tab → Lo3tus or Helen · practice Degraves phrases',
    bufferMin: 0,
    pin: 'HOTEL',
    skill: 'lo3tus'
  },
  {
    id: 'date-meet',
    day: 'Date night',
    city: 'Melbourne',
    time: '17:00',
    tz: TIMEZONE.melbourne,
    title: 'Meet · Flinders Lane end',
    transport: MELBOURNE_TRANSIT.flindersToDegraves,
    action: 'Golden hour outing start — 15 min silly ingredient cap',
    bufferMin: 15,
    pin: 'DEGRAVES',
    skill: 'melbourne-lantern-bard',
    cookOffPhase: 'outing'
  },
  {
    id: 'date-degraves',
    day: 'Date night',
    city: 'Melbourne',
    time: '17:20',
    tz: TIMEZONE.melbourne,
    title: 'Degraves stroll + flat white',
    transport: { mode: 'walk', icon: '☕', lane: 'Degraves Street' },
    action: 'Flat white to-go — Bard: hydration not romance',
    bufferMin: 25,
    pin: 'DEGRAVES',
    skill: 'lo3tus',
    cookOffPhase: 'outing'
  },
  {
    id: 'date-kitchen',
    day: 'Date night',
    city: 'Melbourne',
    time: '18:15',
    tz: TIMEZONE.melbourne,
    title: 'Kitchen stations · 45 min cook-off',
    transport: MELBOURNE_TRANSIT.degravesToKitchen,
    action: 'Stations set · GoPro consent · SYSTEM muted',
    bufferMin: 45,
    pin: 'HOTEL',
    skill: 'helen-neighbor',
    cookOffPhase: 'stations'
  },
  {
    id: 'date-score',
    day: 'Date night',
    city: 'Melbourne',
    time: '19:15',
    tz: TIMEZONE.melbourne,
    title: 'Score · eat · dishes',
    transport: { mode: 'none', icon: '🏮' },
    action: 'Bard scorecards — boundaries category mandatory',
    bufferMin: 30,
    pin: 'DEGRAVES',
    skill: 'melbourne-lantern-bard',
    cookOffPhase: 'cookoff'
  },
  {
    id: 'after-novel',
    day: 'Date night +1',
    city: 'Melbourne',
    time: '06:12',
    tz: TIMEZONE.melbourne,
    title: 'Degraves at dawn (girls-love Ch.2)',
    transport: MELBOURNE_TRANSIT.flindersToDegraves,
    action: 'Croissant run — phones optional, boundaries intact',
    bufferMin: 40,
    pin: 'DEGRAVES',
    skill: 'asuka-brisbane',
    novelChapter: 2
  },
  {
    id: 'return-akl',
    day: 'Return (optional)',
    city: 'Melbourne → Auckland',
    time: '10:00',
    tz: TIMEZONE.melbourne,
    title: 'Return flight · RTDB on landing',
    transport: { mode: 'flight', icon: '✈️' },
    action: 'Land AKL → Waitemata RTDB for train home — ferry only if buffer day',
    bufferMin: 60,
    rtdbLocation: 'waitemata',
    pin: 'MEL',
    skill: 'rach3l'
  }
];

export function getScheduleLeg(id) {
  return DATE_SCHEDULE.find((leg) => leg.id === id) || null;
}

export function legsForCookOffPhase(phase) {
  return DATE_SCHEDULE.filter((leg) => leg.cookOffPhase === phase);
}

export function legsWithRtdb() {
  return DATE_SCHEDULE.filter((leg) => leg.rtdbLocation);
}

export function optimizeDateWindow({ outingStart = '17:00', cookOffMinutes = 45 } = {}) {
  const [h, m] = outingStart.split(':').map(Number);
  const outingMin = h * 60 + m;
  const kitchenStart = outingMin + 15 + 25;
  const scoreStart = kitchenStart + cookOffMinutes;
  const fmt = (mins) => {
    const hh = Math.floor(mins / 60) % 24;
    const mm = mins % 60;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  };
  return {
    outingStart,
    ingredientCapEnd: fmt(outingMin + 15),
    flatWhiteBy: fmt(outingMin + 25),
    kitchenStart: fmt(kitchenStart),
    scoreStart: fmt(scoreStart),
    homeBy: fmt(scoreStart + 30 + MELBOURNE_TRANSIT.lastTramBuffer.minutes),
    rtdbCheckBeforeLeave: `Refresh RTDB every ${RTDB.display.refreshIntervalSeconds}s — rotate boards every ${RTDB.display.rotationSeconds}s before AKL airport leg`
  };
}

export function rtdbLocationById(id) {
  return RTDB.locations.find((loc) => loc.id === id) || null;
}
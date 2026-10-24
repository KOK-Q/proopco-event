/**
 * Single source of truth for all event content.
 * Edit this file to make the landing page your own — every section reads from here.
 */

export const event = {
  name: "Proop Summit 2026",
  tagline: "The build conference for people shipping what's next",
  description:
    "One day, one room, and the people turning hard problems into shipped products. Join builders, founders, and product teams at Proop Summit 2026.",

  // ISO 8601 with timezone offset — drives the hero countdown.
  startsAt: "2026-12-03T09:00:00+00:00",
  dateLabel: "December 3, 2026",
  dayLabel: "Thursday",
  timeLabel: "09:00 – 18:00 WET",

  venue: "Beato Creative Hub",
  city: "Lisbon, Portugal",

  stats: [
    { value: "12", label: "Talks" },
    { value: "400", label: "Builders" },
    { value: "1", label: "Day, zero fluff" },
    { value: "18", label: "Hours of hallway track" },
  ],

  nav: [
    { label: "About", href: "#about" },
    { label: "Agenda", href: "#agenda" },
    { label: "Speakers", href: "#speakers" },
    { label: "Register", href: "#register" },
  ],

  topics: [
    "Shipping velocity",
    "AI in production",
    "Design systems",
    "Developer experience",
    "Scaling teams",
    "Zero-to-one",
    "Infra that holds",
    "Taste & craft",
  ],

  about: {
    kicker: "Why show up",
    heading: "A conference built like a product, not a trade show.",
    body: "No sponsor-booth maze, no keynote fog. Proop Summit is a single track of people who have actually shipped — teaching the decisions that worked and the ones that didn't. You leave with things you can use on Monday.",
    points: [
      {
        title: "One track, no FOMO",
        body: "Everyone sees every talk. No agonizing over which room to pick — the whole room moves together.",
      },
      {
        title: "Practitioners only",
        body: "Every speaker is currently building. The lessons are fresh, specific, and hard-won — not recycled keynote decks.",
      },
      {
        title: "Built for the hallway",
        body: "Long breaks, small rooms, and a city that invites a walk. The best conversations happen between the talks.",
      },
    ],
  },

  agenda: [
    { time: "09:00", title: "Doors & coffee", speaker: "Registration opens", kind: "break" },
    { time: "09:45", title: "Opening: What 'shipped' actually means", speaker: "Mara Okafor", kind: "talk" },
    { time: "10:30", title: "Zero-to-one without the drama", speaker: "Tomás Vieira", kind: "talk" },
    { time: "11:15", title: "Break & hallway track", speaker: "", kind: "break" },
    { time: "11:45", title: "Putting AI in the critical path", speaker: "Priya Nandakumar", kind: "talk" },
    { time: "12:30", title: "Lunch", speaker: "", kind: "break" },
    { time: "14:00", title: "Design systems that survive contact", speaker: "Jonas Lindqvist", kind: "talk" },
    { time: "14:45", title: "Infra you don't have to babysit", speaker: "Dani Reyes", kind: "talk" },
    { time: "15:30", title: "Break & hallway track", speaker: "", kind: "break" },
    { time: "16:00", title: "Scaling a team without losing the plot", speaker: "Amara Bello", kind: "talk" },
    { time: "16:45", title: "Panel: Taste, craft, and shipping fast", speaker: "All speakers", kind: "talk" },
    { time: "17:30", title: "Closing & drinks", speaker: "", kind: "break" },
  ],

  speakers: [
    { name: "Mara Okafor", role: "VP Engineering, Northwind", initials: "MO" },
    { name: "Tomás Vieira", role: "Founder, Relay", initials: "TV" },
    { name: "Priya Nandakumar", role: "Head of AI, Fathom", initials: "PN" },
    { name: "Jonas Lindqvist", role: "Principal Designer, Arc", initials: "JL" },
    { name: "Dani Reyes", role: "Staff SRE, Orbit", initials: "DR" },
    { name: "Amara Bello", role: "CTO, Kindred", initials: "AB" },
  ],

  tickets: [
    {
      name: "Early Bird",
      price: "€149",
      note: "Limited — first 100 seats",
      perks: ["Full-day access", "Lunch & drinks", "Talk recordings", "Hallway track"],
      featured: false,
    },
    {
      name: "Standard",
      price: "€229",
      note: "Most popular",
      perks: [
        "Everything in Early Bird",
        "Reserved seating",
        "Speaker dinner invite",
        "Summit swag kit",
      ],
      featured: true,
    },
    {
      name: "Team of 5",
      price: "€899",
      note: "Bring the whole squad",
      perks: [
        "5 Standard tickets",
        "Dedicated team table",
        "Group intro on stage",
        "Invoice billing",
      ],
      featured: false,
    },
  ],

  faqs: [
    {
      q: "Is it really a single track?",
      a: "Yes. One room, every talk. You never have to choose what to miss.",
    },
    {
      q: "Will talks be recorded?",
      a: "Every ticket includes access to the full recordings, published within two weeks of the event.",
    },
    {
      q: "What's included with a ticket?",
      a: "Full-day access, lunch, coffee, closing drinks, and the hallway track. Higher tiers add seating, dinner, and swag.",
    },
    {
      q: "Can I get an invoice for my company?",
      a: "Absolutely. Team tickets include invoice billing, and we can issue one for any tier on request.",
    },
  ],

  social: {
    email: "hello@proop.co",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export type EventData = typeof event;

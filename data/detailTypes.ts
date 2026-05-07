import type { DetailTypeDefinition, EventDetailRow } from "@/types/eventDetails";

export const MAX_EVENT_DETAILS = 10;

export const detailTypes: DetailTypeDefinition[] = [
  { type: "eventTitle", label: "Event Title", inputKind: "text" },
  {
    type: "occasionType",
    label: "Occasion Type",
    inputKind: "select",
    options: [
      "Birthday",
      "Wedding",
      "Baby Shower",
      "Bridal Shower",
      "Graduation",
      "Retirement",
      "Anniversary",
      "Holiday Party",
      "Corporate Event",
      "Dinner Party",
      "Fundraiser",
      "Other"
    ]
  },
  { type: "hostNames", label: "Host Name(s)", inputKind: "text" },
  { type: "guestOfHonor", label: "Guest of Honor", inputKind: "text" },
  { type: "venueName", label: "Venue Name", inputKind: "text" },
  { type: "venueAddress", label: "Venue Address", inputKind: "textarea" },
  { type: "startDateTime", label: "Start Date & Time", inputKind: "datetime-local" },
  { type: "endDateTime", label: "End Date & Time", inputKind: "datetime-local" },
  {
    type: "dressCode",
    label: "Dress Code",
    inputKind: "select",
    options: [
      "Casual",
      "Smart Casual",
      "Cocktail",
      "Semi-Formal",
      "Formal",
      "Black Tie",
      "White Tie",
      "Costume",
      "Theme Attire",
      "Other"
    ]
  },
  { type: "rsvpRequired", label: "RSVP Required", inputKind: "select", options: ["Yes", "No"] },
  { type: "rsvpDeadline", label: "RSVP Deadline", inputKind: "date" },
  {
    type: "plusOnePolicy",
    label: "Plus-One Policy",
    inputKind: "select",
    options: ["Plus ones welcome", "Named guests only", "By invitation only", "Ask the host", "Other"]
  },
  {
    type: "childrenPolicy",
    label: "Children Policy",
    inputKind: "select",
    options: ["Children welcome", "Adults only", "Family-friendly", "Ask the host", "Other"]
  },
  { type: "parkingInstructions", label: "Parking Instructions", inputKind: "textarea" },
  { type: "arrivalInstructions", label: "Arrival Instructions", inputKind: "textarea" },
  { type: "entryInstructions", label: "Entry Instructions", inputKind: "textarea" },
  { type: "transportationDetails", label: "Transportation / Shuttle Details", inputKind: "textarea" },
  { type: "eventSchedule", label: "Event Schedule / Itinerary", inputKind: "textarea" },
  { type: "mealInformation", label: "Meal Information", inputKind: "textarea" },
  { type: "dietaryRestrictions", label: "Dietary Restrictions Request", inputKind: "textarea" },
  { type: "giftRegistryUrl", label: "Gift Registry URL", inputKind: "url" },
  { type: "giftPreference", label: "Gift Preference", inputKind: "text" },
  { type: "websiteUrl", label: "Website URL", inputKind: "url" },
  { type: "socialHashtag", label: "Social Hashtag", inputKind: "text" },
  { type: "accessibilityNote", label: "Accessibility Note", inputKind: "textarea" },
  { type: "weatherOutdoorNote", label: "Weather / Outdoor Note", inputKind: "textarea" },
  { type: "specialNote", label: "Special Note", inputKind: "textarea" },
  { type: "custom", label: "Custom Detail", inputKind: "custom", allowMultiple: true }
];

export const detailTypeByType = new Map(detailTypes.map((detailType) => [detailType.type, detailType]));

export const createEmptyRow = (): EventDetailRow => ({
  id: crypto.randomUUID(),
  type: "",
  value: ""
});

export const sampleEventRows = (): EventDetailRow[] => [
  { id: crypto.randomUUID(), type: "eventTitle", value: "Midsummer Garden Party" },
  { id: crypto.randomUUID(), type: "venueName", value: "The Greenhouse Loft" },
  { id: crypto.randomUUID(), type: "venueAddress", value: "123 W. Bloom Street, Chicago, IL" },
  { id: crypto.randomUUID(), type: "startDateTime", value: "2026-06-12T18:00" },
  { id: crypto.randomUUID(), type: "endDateTime", value: "2026-06-12T22:00" },
  { id: crypto.randomUUID(), type: "dressCode", value: "Cocktail" },
  { id: crypto.randomUUID(), type: "rsvpRequired", value: "Yes" },
  { id: crypto.randomUUID(), type: "rsvpDeadline", value: "2026-05-30" },
  { id: crypto.randomUUID(), type: "parkingInstructions", value: "Street parking is available nearby." },
  {
    id: crypto.randomUUID(),
    type: "custom",
    customLabel: "Secret Password",
    value: "Say \"pineapple\" at the door"
  }
];

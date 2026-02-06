export type Destination = {
  id: string;
  title: string;
  shortPitch: string;
  moodTags: string[];
  risk: "Low" | "Medium" | "High";
  comfort: "Standard" | "Elevated" | "Elite";
  recommendedDuration: string;
  strongHighlights: string[];
  heroImagePlaceholder: string;
  galleryImagesPlaceholder: string[];
  audioAmbienceLabel: string;
};

export const destinations: Destination[] = [
  {
    id: "paris-1889",
    title: "Paris, 1889",
    shortPitch: "World's Fair, Eiffel Tower, gaslight nights.",
    moodTags: ["Romantic", "Inventive", "Electric"],
    risk: "Low",
    comfort: "Elite",
    recommendedDuration: "4 nights",
    strongHighlights: [
      "Private ascent of the newly finished Eiffel Tower",
      "Midnight salons lit by gaslight and string quartets",
      "Seine crossing in a lacquered river skiff",
      "Panoramic view from the Exposition Universelle dome"
    ],
    heroImagePlaceholder:
      "https://images.unsplash.com/photo-1471623432079-b009d30b6729?auto=format&fit=crop&w=2000&q=80",
    galleryImagesPlaceholder: [
      "https://images.unsplash.com/photo-1471623432079-b009d30b6729?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1600&q=80"
    ],
    audioAmbienceLabel: "Velvet strings + distant carriage wheels"
  },
  {
    id: "cretaceous",
    title: "Cretaceous Frontier",
    shortPitch: "Primeval jungle, dinosaur proximity, high-risk expedition.",
    moodTags: ["Primal", "Untamed", "Expedition"],
    risk: "High",
    comfort: "Standard",
    recommendedDuration: "3 nights",
    strongHighlights: [
      "Dawn watch above a misted canopy",
      "Guided proximity to a migrating hadrosaur herd",
      "Fossil ridge traverse with temporal shields",
      "Night camp beneath aurora-like bio-luminescence"
    ],
    heroImagePlaceholder:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80",
    galleryImagesPlaceholder: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
    ],
    audioAmbienceLabel: "Canopy thunder + distant calls"
  },
  {
    id: "florence-1504",
    title: "Florence, 1504",
    shortPitch: "Renaissance ateliers, Michelangelo era, cultural immersion.",
    moodTags: ["Artisan", "Scholarly", "Golden"],
    risk: "Medium",
    comfort: "Elevated",
    recommendedDuration: "5 nights",
    strongHighlights: [
      "Private atelier tour during David's unveiling",
      "Illuminated manuscripts in a Medici library",
      "Arno dusk procession with master artisans",
      "Courtyard recital with lute ensembles"
    ],
    heroImagePlaceholder:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80",
    galleryImagesPlaceholder: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
    ],
    audioAmbienceLabel: "Ink, stone, and warm bell towers"
  }
];

export const featuredDestination = destinations[0];

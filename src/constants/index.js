import DrainVaderImage from "@app/assets/draINvader.png";
import PageStreetPlasticCollectiveImage from "@app/assets/pspc.png";

export const INTERACTIVE_MAP_SECTION = {
  id: "map",
  title: "Interactive Map",
  subtitle:
    "Explore the locations where drain covers have been reported stolen or need replacement. Help us capture and address this city-wide issue.",
};

export const COVER_THE_CITY_SECTION = {
  id: "cover-the-city",
  title: "Cover the City",
  subtitle:
    "Our vision extends beyond Page Street. We aim to enable the whole city to cover their drain covers.",
};

export const MODEL_3D_SECTION = {
  id: "model-3d",
  title: "Basic 3D Model",
  subtitle:
    "Explore our drain cover design in 3D. You can rotate, zoom, and download the model for 3D printing and further development.",
};

export const CONTRIBUTORS_SECTION = {
  id: "contributors",
  title: "Contributors",
  subtitle:
    "We are a loose collective of neighbors who want to solve local problems creatively and sustainably.",
};

export const PROBLEM_SECTION = {
  id: "problem",
  title: "A Frustrating Problem",
  subtitle:
    "In San Francisco, homeowners are required to cover the drain pipes in front of their homes with grates to prevent litter from entering the pipes. These covers are made of steel and they a frequently stolen. Historically, they were made of brass.",
};

export const SOLUTION_SECTION = {
  id: "solution",
  title: "A Simple Solution",
  subtitle:
    "As always, there's an opportunity to solve the issue with creativity and community.",
};

export const SUPPORT_US_SECTION = {
  id: "support-us",
  title: "Support Us",
  subtitle:
    "Help us make a difference in our community! The only cost is our plastic filament and the time it takes to print the covers.",
};

export const PRIVACY_SECTION = {
  id: "privacy",
  title: "Simple Privacy",
  subtitle:
    "We get info about how many people have visited our page, but we don't collect any other information.",
};

export const SECTIONS = [
  PROBLEM_SECTION,
  SOLUTION_SECTION,
  MODEL_3D_SECTION,
  INTERACTIVE_MAP_SECTION,
  COVER_THE_CITY_SECTION,
  CONTRIBUTORS_SECTION,
  SUPPORT_US_SECTION,
  PRIVACY_SECTION,
];

export const CONTRIBUTORS = [
  {
    name: "Page Street Plastic Collective",
    description: "Functional minimalism to cover the city.",
    image: PageStreetPlasticCollectiveImage,
    link: "https://instagram.com/pagestreetplasticcollective",
  },
  {
    name: "draINvader",
    description:
      "Inspired by Space Invader, draINvader uses multi-colored filament to create art and cover the city!",
    image: DrainVaderImage,
    link: "https://www.instagram.com/drainvader/",
  },
];

export const IMPLEMENTATION_PHASES = [
  {
    done: true,
    title: "Page Street",
    description:
      "Starting with our local neighborhood from Market to Stanyan Street.",
  },
  {
    title: "Lower Haight / Haight Ashbury",
    description:
      "Expanding to neighboring districts with similar drainage challenges.",
  },
  {
    title: "Citywide Coverage",
    description:
      "Scaling our solution across all of San Francisco's storm drain network.",
  },
  {
    title: "WORLDWIDE",
    description:
      "Scaling our solution across the world. (Okay, maybe not the whole world, but we're trying to make a big impact!)",
  },
];

export const COVER_STATS = [
  {
    title: "10,000+",
    value: "Building drain covers in San Francisco",
  },
  {
    title: "100%",
    value: "Coverage goal for all drain covers in San Francisco",
  },
  {
    title: "Community",
    value: "Driven by local residents and organizations",
  },
  {
    title: "Worldwide",
    value: "Scaling our solution across the world.",
  },
];

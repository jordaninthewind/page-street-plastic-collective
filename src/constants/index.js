import PageStreetPlasticCollectiveImage from "@app/assets/pspc.png";
import DrainVaderImage from "@app/assets/draINvader.png";

export const COPY_PROPS = {
  map: {
    id: "map",
    title: "Interactive Map",
    subtitle:
      "Explore the locations where drain covers have been reported stolen or need replacement. Help us capture and address this city-wide issue.",
  },
  contact: {
    id: "contact",
    title: "Send us a message!",
    subtitle:
      "We would love to hear from you! Please fill out the form below to send us a message.",
  },
  coverTheCity: {
    id: "cover-the-city",
    title: "Cover the City",
    subtitle:
      "Our vision extends beyond Page Street. We aim to enable the whole city to cover their drain covers.",
  },
  model3D: {
    id: "model-3d",
    title: "Basic 3D Model",
    subtitle:
      "Explore our drain cover design in 3D. You can rotate, zoom, and download the model for 3D printing and further development.",
  },
  contributors: {
    id: "contributors",
    title: "Contributors",
    subtitle:
      "We are a loose collective of neighbors who want to solve local problems creatively and sustainably.",
  },
  problem: {
    id: "problem",
    title: "A Frustrating Problem",
    subtitle:
      "In San Francisco, homeowners are required to cover the drain pipes in front of their homes with grates to prevent litter from entering the pipes. These covers are made of steel and they a frequently stolen. Historically, they were made of brass.",
  },
  privacy: {
    id: "privacy",
    title: "Simple Privacy",
    subtitle:
      "We get info about how many people have visited our page, but we don't collect any other information.",
  },
  solution: {
    id: "solution",
    title: "A Simple Solution",
    subtitle:
      "As always, there's an opportunity to solve the issue with creativity and community.",
  },
  supportUs: {
    id: "support-us",
    title: "Support Our Mission",
    subtitle:
      "Help us make a difference in our community by supporting our plastic collection initiative.",
  },
};

export const CONTRIBUTORS = [
  {
    title: "Page Street Plastic Collective",
    description: "Functional minimalism to cover the city.",
    image: PageStreetPlasticCollectiveImage,
    link: "https://instagram.com/pagestreetplasticcollective",
  },
  {
    title: "draINvader",
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
    title: "Lower Haight & Haight Ashbury",
    description:
      "Expanding to neighboring districts with similar drainage challenges.",
  },
  {
    title: "Citywide Coverage",
    description:
      "Scaling our solution across all of San Francisco's storm drain network.",
  },
  {
    title: "WORLDWIDE COVERAGE",
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

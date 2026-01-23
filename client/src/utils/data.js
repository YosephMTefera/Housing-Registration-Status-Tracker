import { language } from "./part-1lan";

export const services = [
  {
    id: "1",
    title: "Land Design and Infrastructure Development",
    description:
      "on lihtsalt proovitekst, mida madi printimis- ja ladumistööstuses. se olnud tööstuse",
    icon: "land.png",
  },
  {
    id: "2",
    title: "House Construction",
    description:
      "on lihtsalt proovitekst, mida madi printimis- ja ladumistööstuses. se olnud tööstuse",
    icon: "Ellipse 3.png",
  },
  {
    id: "3",
    title: "House Transfer and Construction Finance",
    description:
      "on lihtsalt proovitekst, mida madi printimis- ja ladumistööstuses. se olnud tööstuse",
    icon: "Ellipse 7.png",
  },

  {
    id: "4",
    title: "Corporate Service",
    description:
      "on lihtsalt proovitekst, mida madi printimis- ja ladumistööstuses. se olnud tööstuse",
    icon: "Ellipse 6.png",
  },
];

export const languageTranslate = (lang, key) => {
  let translatedValue;

  switch (lang) {
    case "En":
      translatedValue = language[key][0];
      break;
    case "Am":
      translatedValue = language[key][1];
      break;
    case "Or":
      translatedValue = language[key][2];
      break;
    case "Ti":
      translatedValue = language[key][3];
      break;
    case "So":
      translatedValue = language[key][4];
      break;
    case "Af":
      translatedValue = language[key][5];
      break;
    default:
      break;
  }

  return translatedValue;
};

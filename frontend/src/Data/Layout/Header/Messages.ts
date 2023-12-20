const images = require.context("../../../assets/images/user", true);
const dynamicImage = (image: string) => {
  return images(`./${image}`);
};
export const Messages = [
  {
    imageSrc: dynamicImage("2.jpg"),
    imageAlt: "user2",
    statusClass: "status-circle online",
    MessageTime: "24 hr ago",
    userName: "Erica Hughes",
  },
  {
    imageSrc: dynamicImage("1.jpg"),
    imageAlt: "user1",
    statusClass: "status-circle away",
    MessageTime: "58 mins ago",
    userName: "Kori Thomas",
  },
  {
    imageSrc: dynamicImage("4.jpg"),
    imageAlt: "user4",
    statusClass: "status-circle offline",
    MessageTime: "32 mins ago",
    userName: "Ain Chavez",
  },
];

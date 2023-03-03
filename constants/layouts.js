import { SHADOWS } from "./theme";

const containerDark = {
  width: "100%",
  backgroundColor: "white",
  padding: 12,
  borderRadius: 10,
  marginVertical: 10,
  ...SHADOWS.dark,
};
const containerMedium = {
  width: "100%",
  backgroundColor: "white",
  padding: 12,
  borderRadius: 10,
  marginVertical: 10,
  ...SHADOWS.medium,
};
const containerLight = {
  width: "100%",
  backgroundColor: "white",
  padding: 12,
  borderRadius: 10,
  marginVertical: 10,
  ...SHADOWS.medium,
};

export { containerLight, containerMedium, containerDark };

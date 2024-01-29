import { create } from "@storybook/theming";
import { addons } from "@storybook/addons";

const myTheme = create({
  base: "light",
});

addons.setConfig({
  theme: myTheme,
});

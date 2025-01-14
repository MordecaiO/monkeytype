import * as UpdateConfig from "../../config";
import * as UI from "../../ui";

const subgroup: MonkeyTypes.CommandsSubgroup = {
  title: "Font family...",
  configKey: "fontFamily",
  list: [],
};

const commands: MonkeyTypes.Command[] = [
  {
    id: "changeFontFamily",
    display: "Font family...",
    icon: "fa-font",
    subgroup,
  },
];

function update(fonts: MonkeyTypes.FontObject[]): void {
  fonts.forEach((font) => {
    const configVal = font.name.replace(/ /g, "_");
    subgroup.list.push({
      id: "changeFont" + font.name.replace(/ /g, "_"),
      display: font.display !== undefined ? font.display : font.name,
      configValue: configVal,
      customStyle: `font-family: ${font.name}`,
      hover: (): void => {
        UI.previewFontFamily(font.name);
      },
      exec: (): void => {
        UpdateConfig.setFontFamily(font.name.replace(/ /g, "_"));
      },
    });
  });
  subgroup.list.push({
    id: "setFontFamilyCustom",
    display: "custom...",
    input: true,
    hover: (): void => {
      UI.clearFontPreview();
    },
    exec: (name) => {
      if (name === undefined || name === "") return;
      UpdateConfig.setFontFamily(name.replace(/\s/g, "_"));
      // Settings.groups.fontFamily.updateInput();
    },
  });
}

export default commands;
export { update };

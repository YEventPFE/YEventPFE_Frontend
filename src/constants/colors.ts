const BaseColors = {
    "Gunmetal": "#30343F",
    "Ghost White": "#FAFAFF",
    "Periwinkle": "#E4D9FF",
    "Delft Blue": "#273469",
    "Space Cadet": "#1E2749",

    "Red": "#FF0000",
}

const Colors = {
    background: BaseColors["Ghost White"],
    surface: BaseColors["Periwinkle"],

    primary: BaseColors["Delft Blue"],
    secondary: BaseColors["Space Cadet"],

    textPrimary: BaseColors["Gunmetal"],
    textSecondary: BaseColors["Delft Blue"],

    border: BaseColors["Gunmetal"],

    accent: BaseColors["Periwinkle"],

    error: BaseColors["Red"],
    success: BaseColors["Delft Blue"],
    warning: BaseColors["Gunmetal"],
};

export default Colors;
const BaseColors = {
    gunMetal: "#30343F",
    ghostWhite: "#fffafaff",
    periwinkle: "#E4D9FF",
    delftBlue: "#273469",
    spaceCadet: "#1E2749",

    red: "#FF0000",
};

const Colors = {
    primary: BaseColors.delftBlue,
    secondary: BaseColors.spaceCadet,
    danger: BaseColors.red,

    container:{
        background: BaseColors.ghostWhite,
        surface: BaseColors.periwinkle,
        border: BaseColors.gunMetal,
        accent: BaseColors.periwinkle,
    },
    text: {
        primary: BaseColors.gunMetal,
        secondary: BaseColors.delftBlue,
        title: BaseColors.delftBlue,
        error: BaseColors.red,
        success: BaseColors.delftBlue,
        warning: BaseColors.gunMetal,
        tag: BaseColors.spaceCadet,
        pressable: BaseColors.periwinkle,
    },
};

export default Colors;
// const BaseColors = {
//     gunMetal: "#30343F",
//     ghostWhite: "#fffafaff",
//     periwinkle: "#E4D9FF",
//     delftBlue: "#273469",
//     spaceCadet: "#1E2749",

//     red: "#FF0000",
// };
// const BaseColors = {
//     bg: "#474350",
//     text: "#FCFFEB",
//     text2: "#B9B8D3",
//     accent: "#06A77D",
//     red: "#FF0000"
// };

// const BaseColors = {
//     bg: "#FAAA8D",
//     text: "#FEEFDD",
//     text2: "#FFE0E0FF",
//     accent: "#FF4000",
//     red: "#FF0000"
// };



const BaseColors = {
    bg: "#FFFFFF",
    bgaccent: "#5ed0f7",
    text: "#2f2585",
    text2: "#413989ff",
    red: "#FF0000"
};



const Colors = {
    primary: BaseColors.text,
    secondary: BaseColors.text2,
    danger: BaseColors.red,

    container:{
        background: BaseColors.bg,
        surface: BaseColors.text,
        border: BaseColors.text2,
        accent: BaseColors.bgaccent,
    },
    text: {
        primary: BaseColors.text,
        secondary: BaseColors.text2,
        title: BaseColors.text2,
        error: BaseColors.red,
        success: BaseColors.text,
        warning: BaseColors.text2,
        tag: BaseColors.text2,
        pressable: BaseColors.text2,
    },
};

// const Colors = {
//     primary: BaseColors.delftBlue,
//     secondary: BaseColors.spaceCadet,
//     danger: BaseColors.red,

//     container:{
//         background: BaseColors.ghostWhite,
//         surface: BaseColors.periwinkle,
//         border: BaseColors.gunMetal,
//         accent: BaseColors.periwinkle,
//     },
//     text: {
//         primary: BaseColors.gunMetal,
//         secondary: BaseColors.delftBlue,
//         title: BaseColors.delftBlue,
//         error: BaseColors.red,
//         success: BaseColors.delftBlue,
//         warning: BaseColors.gunMetal,
//         tag: BaseColors.spaceCadet,
//         pressable: BaseColors.periwinkle,
//     },
// };

export default Colors;
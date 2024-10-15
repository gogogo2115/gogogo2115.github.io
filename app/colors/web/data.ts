type HEX_OBJ = { r: string; g: string; b: string };
type RGB_OBJ = { r: number; g: number; b: number };

/**
 * 웹 색상을 이름, 16진수 값, RGB 값으로 표현한 타입입니다.
 */
export type WebData = {
  name: string;
  hex: HEX_OBJ;
  rgb: RGB_OBJ;
};

/**
 * 웹 색상들의 배열로, 각 색상은 이름, 16진수 값, RGB 값을 포함합니다.
 */
export const data: WebData[] = [
  // { name: "transparent", hex: { r: "", g: "", b: "" }, rgb: { r: NaN, g: NaN, b: NaN } },

  // Pink colors
  { name: "MediumVioletRed", hex: { r: "C7", g: "15", b: "85" }, rgb: { r: 199, g: 21, b: 133 } },
  { name: "DeepPink", hex: { r: "FF", g: "14", b: "93" }, rgb: { r: 255, g: 20, b: 147 } },
  { name: "PaleVioletRed", hex: { r: "DB", g: "70", b: "93" }, rgb: { r: 219, g: 112, b: 147 } },
  { name: "HotPink", hex: { r: "FF", g: "69", b: "B4" }, rgb: { r: 255, g: 105, b: 180 } },
  { name: "LightPink", hex: { r: "FF", g: "B6", b: "C1" }, rgb: { r: 255, g: 182, b: 193 } },
  { name: "Pink", hex: { r: "FF", g: "C0", b: "CB" }, rgb: { r: 255, g: 192, b: 203 } },

  // Red colors
  { name: "DarkRed", hex: { r: "8B", g: "00", b: "00" }, rgb: { r: 139, g: 0, b: 0 } },
  { name: "Red", hex: { r: "FF", g: "00", b: "00" }, rgb: { r: 255, g: 0, b: 0 } },
  { name: "Firebrick", hex: { r: "B2", g: "22", b: "22" }, rgb: { r: 178, g: 34, b: 34 } },
  { name: "Crimson", hex: { r: "DC", g: "14", b: "3C" }, rgb: { r: 220, g: 20, b: 60 } },
  { name: "IndianRed", hex: { r: "CD", g: "5C", b: "5C" }, rgb: { r: 205, g: 92, b: 92 } },
  { name: "LightCoral", hex: { r: "F0", g: "80", b: "80" }, rgb: { r: 240, g: 128, b: 128 } },
  { name: "Salmon", hex: { r: "FA", g: "80", b: "72" }, rgb: { r: 250, g: 128, b: 114 } },
  { name: "DarkSalmon", hex: { r: "E9", g: "96", b: "7A" }, rgb: { r: 233, g: 150, b: 122 } },
  { name: "LightSalmon", hex: { r: "FF", g: "A0", b: "7A" }, rgb: { r: 255, g: 160, b: 122 } },

  // Orange colors
  { name: "OrangeRed", hex: { r: "FF", g: "45", b: "00" }, rgb: { r: 255, g: 69, b: 0 } },
  { name: "Tomato", hex: { r: "FF", g: "63", b: "47" }, rgb: { r: 255, g: 99, b: 71 } },
  { name: "DarkOrange", hex: { r: "FF", g: "8C", b: "00" }, rgb: { r: 255, g: 140, b: 0 } },
  { name: "Coral", hex: { r: "FF", g: "7F", b: "50" }, rgb: { r: 255, g: 127, b: 80 } },
  { name: "Orange", hex: { r: "FF", g: "A5", b: "00" }, rgb: { r: 255, g: 165, b: 0 } },

  // Yellow colors
  { name: "DarkKhaki", hex: { r: "BD", g: "B7", b: "6B" }, rgb: { r: 189, g: 183, b: 107 } },
  { name: "Gold", hex: { r: "FF", g: "D7", b: "00" }, rgb: { r: 255, g: 215, b: 0 } },
  { name: "Khaki", hex: { r: "F0", g: "E6", b: "8C" }, rgb: { r: 240, g: 230, b: 140 } },
  { name: "PeachPuff", hex: { r: "FF", g: "DA", b: "B9" }, rgb: { r: 255, g: 218, b: 185 } },
  { name: "Yellow", hex: { r: "FF", g: "FF", b: "00" }, rgb: { r: 255, g: 255, b: 0 } },
  { name: "PaleGoldenrod", hex: { r: "EE", g: "E8", b: "AA" }, rgb: { r: 238, g: 232, b: 170 } },
  { name: "Moccasin", hex: { r: "FF", g: "E4", b: "B5" }, rgb: { r: 255, g: 228, b: 181 } },
  { name: "PapayaWhip", hex: { r: "FF", g: "EF", b: "D5" }, rgb: { r: 255, g: 239, b: 213 } },
  { name: "LightGoldenrodYellow", hex: { r: "FA", g: "FA", b: "D2" }, rgb: { r: 250, g: 250, b: 210 } },
  { name: "LemonChiffon", hex: { r: "FF", g: "FA", b: "CD" }, rgb: { r: 255, g: 250, b: 205 } },
  { name: "LightYellow", hex: { r: "FF", g: "FF", b: "E0" }, rgb: { r: 255, g: 255, b: 224 } },

  // Brown colors
  { name: "Maroon", hex: { r: "80", g: "00", b: "00" }, rgb: { r: 128, g: 0, b: 0 } },
  { name: "Brown", hex: { r: "A5", g: "2A", b: "2A" }, rgb: { r: 165, g: 42, b: 42 } },
  { name: "SaddleBrown", hex: { r: "8B", g: "45", b: "13" }, rgb: { r: 139, g: 69, b: 19 } },
  { name: "Sienna", hex: { r: "A0", g: "52", b: "2D" }, rgb: { r: 160, g: 82, b: 45 } },
  { name: "Chocolate", hex: { r: "D2", g: "69", b: "1E" }, rgb: { r: 210, g: 105, b: 30 } },
  { name: "DarkGoldenrod", hex: { r: "B8", g: "86", b: "0B" }, rgb: { r: 184, g: 134, b: 11 } },
  { name: "Peru", hex: { r: "CD", g: "85", b: "3F" }, rgb: { r: 205, g: 133, b: 63 } },
  { name: "RosyBrown", hex: { r: "BC", g: "8F", b: "8F" }, rgb: { r: 188, g: 143, b: 143 } },
  { name: "Goldenrod", hex: { r: "DA", g: "A5", b: "20" }, rgb: { r: 218, g: 165, b: 32 } },
  { name: "SandyBrown", hex: { r: "F4", g: "A4", b: "60" }, rgb: { r: 244, g: 164, b: 96 } },
  { name: "Tan", hex: { r: "D2", g: "B4", b: "8C" }, rgb: { r: 210, g: 180, b: 140 } },
  { name: "Burlywood", hex: { r: "DE", g: "B8", b: "87" }, rgb: { r: 222, g: 184, b: 135 } },
  { name: "Wheat", hex: { r: "F5", g: "DE", b: "B3" }, rgb: { r: 245, g: 222, b: 179 } },
  { name: "NavajoWhite", hex: { r: "FF", g: "DE", b: "AD" }, rgb: { r: 255, g: 222, b: 173 } },
  { name: "Bisque", hex: { r: "FF", g: "E4", b: "C4" }, rgb: { r: 255, g: 228, b: 196 } },
  { name: "BlanchedAlmond", hex: { r: "FF", g: "EB", b: "CD" }, rgb: { r: 255, g: 235, b: 205 } },
  { name: "Cornsilk", hex: { r: "FF", g: "F8", b: "DC" }, rgb: { r: 255, g: 248, b: 220 } },

  // Purple, violet, and magenta colors
  { name: "Indigo", hex: { r: "4B", g: "00", b: "82" }, rgb: { r: 75, g: 0, b: 130 } },
  { name: "Purple", hex: { r: "80", g: "00", b: "80" }, rgb: { r: 128, g: 0, b: 128 } },
  { name: "DarkMagenta", hex: { r: "8B", g: "00", b: "8B" }, rgb: { r: 139, g: 0, b: 139 } },
  { name: "DarkViolet", hex: { r: "94", g: "00", b: "D3" }, rgb: { r: 148, g: 0, b: 211 } },
  { name: "DarkSlateBlue", hex: { r: "48", g: "3D", b: "8B" }, rgb: { r: 72, g: 61, b: 139 } },
  { name: "BlueViolet", hex: { r: "8A", g: "2B", b: "E2" }, rgb: { r: 138, g: 43, b: 226 } },
  { name: "DarkOrchid", hex: { r: "99", g: "32", b: "CC" }, rgb: { r: 153, g: 50, b: 204 } },
  { name: "Fuchsia", hex: { r: "FF", g: "00", b: "FF" }, rgb: { r: 255, g: 0, b: 255 } },
  { name: "Magenta", hex: { r: "FF", g: "00", b: "FF" }, rgb: { r: 255, g: 0, b: 255 } },
  { name: "SlateBlue", hex: { r: "6A", g: "5A", b: "CD" }, rgb: { r: 106, g: 90, b: 205 } },
  { name: "MediumSlateBlue", hex: { r: "7B", g: "68", b: "EE" }, rgb: { r: 123, g: 104, b: 238 } },
  { name: "MediumOrchid", hex: { r: "BA", g: "55", b: "D3" }, rgb: { r: 186, g: 85, b: 211 } },
  { name: "MediumPurple", hex: { r: "93", g: "70", b: "DB" }, rgb: { r: 147, g: 112, b: 219 } },
  { name: "Orchid", hex: { r: "DA", g: "70", b: "D6" }, rgb: { r: 218, g: 112, b: 214 } },
  { name: "Violet", hex: { r: "EE", g: "82", b: "EE" }, rgb: { r: 238, g: 130, b: 238 } },
  { name: "Plum", hex: { r: "DD", g: "A0", b: "DD" }, rgb: { r: 221, g: 160, b: 221 } },
  { name: "Thistle", hex: { r: "D8", g: "BF", b: "D8" }, rgb: { r: 216, g: 191, b: 216 } },
  { name: "Lavender", hex: { r: "E6", g: "E6", b: "FA" }, rgb: { r: 230, g: 230, b: 250 } },

  // css4
  { name: "RebeccaPurple", hex: { r: "66", g: "33", b: "99" }, rgb: { r: 102, g: 51, b: 153 } },

  // Blue colors
  { name: "MidnightBlue", hex: { r: "19", g: "19", b: "70" }, rgb: { r: 25, g: 25, b: 112 } },
  { name: "Navy", hex: { r: "00", g: "00", b: "80" }, rgb: { r: 0, g: 0, b: 128 } },
  { name: "DarkBlue", hex: { r: "00", g: "00", b: "8B" }, rgb: { r: 0, g: 0, b: 139 } },
  { name: "MediumBlue", hex: { r: "00", g: "00", b: "CD" }, rgb: { r: 0, g: 0, b: 205 } },
  { name: "Blue", hex: { r: "00", g: "00", b: "FF" }, rgb: { r: 0, g: 0, b: 255 } },
  { name: "RoyalBlue", hex: { r: "41", g: "69", b: "E1" }, rgb: { r: 65, g: 105, b: 225 } },
  { name: "SteelBlue", hex: { r: "46", g: "82", b: "B4" }, rgb: { r: 70, g: 130, b: 180 } },
  { name: "DodgerBlue", hex: { r: "1E", g: "90", b: "FF" }, rgb: { r: 30, g: 144, b: 255 } },
  { name: "DeepSkyBlue", hex: { r: "00", g: "BF", b: "FF" }, rgb: { r: 0, g: 191, b: 255 } },
  { name: "CornflowerBlue", hex: { r: "64", g: "95", b: "ED" }, rgb: { r: 100, g: 149, b: 237 } },
  { name: "SkyBlue", hex: { r: "87", g: "CE", b: "EB" }, rgb: { r: 135, g: 206, b: 235 } },
  { name: "LightSkyBlue", hex: { r: "87", g: "CE", b: "FA" }, rgb: { r: 135, g: 206, b: 250 } },
  { name: "LightSteelBlue", hex: { r: "B0", g: "C4", b: "DE" }, rgb: { r: 176, g: 196, b: 222 } },
  { name: "LightBlue", hex: { r: "AD", g: "D8", b: "E6" }, rgb: { r: 173, g: 216, b: 230 } },
  { name: "PowderBlue", hex: { r: "B0", g: "E0", b: "E6" }, rgb: { r: 176, g: 224, b: 230 } },

  // Cyan colors
  { name: "Teal", hex: { r: "00", g: "80", b: "80" }, rgb: { r: 0, g: 128, b: 128 } },
  { name: "DarkCyan", hex: { r: "00", g: "8B", b: "8B" }, rgb: { r: 0, g: 139, b: 139 } },
  { name: "LightSeaGreen", hex: { r: "20", g: "B2", b: "AA" }, rgb: { r: 32, g: 178, b: 170 } },
  { name: "CadetBlue", hex: { r: "5F", g: "9E", b: "A0" }, rgb: { r: 95, g: 158, b: 160 } },
  { name: "DarkTurquoise", hex: { r: "00", g: "CE", b: "D1" }, rgb: { r: 0, g: 206, b: 209 } },
  { name: "MediumTurquoise", hex: { r: "48", g: "D1", b: "CC" }, rgb: { r: 72, g: 209, b: 204 } },
  { name: "Turquoise", hex: { r: "40", g: "E0", b: "D0" }, rgb: { r: 64, g: 224, b: 208 } },
  { name: "Aqua", hex: { r: "00", g: "FF", b: "FF" }, rgb: { r: 0, g: 255, b: 255 } },
  { name: "Cyan", hex: { r: "00", g: "FF", b: "FF" }, rgb: { r: 0, g: 255, b: 255 } },
  { name: "Aquamarine", hex: { r: "7F", g: "FF", b: "D4" }, rgb: { r: 127, g: 255, b: 212 } },
  { name: "PaleTurquoise", hex: { r: "AF", g: "EE", b: "EE" }, rgb: { r: 175, g: 238, b: 238 } },
  { name: "LightCyan", hex: { r: "E0", g: "FF", b: "FF" }, rgb: { r: 224, g: 255, b: 255 } },

  // Green colors
  { name: "DarkGreen", hex: { r: "00", g: "64", b: "00" }, rgb: { r: 0, g: 100, b: 0 } },
  { name: "Green", hex: { r: "00", g: "80", b: "00" }, rgb: { r: 0, g: 128, b: 0 } },
  { name: "DarkOliveGreen", hex: { r: "55", g: "6B", b: "2F" }, rgb: { r: 85, g: 107, b: 47 } },
  { name: "ForestGreen", hex: { r: "22", g: "8B", b: "22" }, rgb: { r: 34, g: 139, b: 34 } },
  { name: "SeaGreen", hex: { r: "2E", g: "8B", b: "57" }, rgb: { r: 46, g: 139, b: 87 } },
  { name: "Olive", hex: { r: "80", g: "80", b: "00" }, rgb: { r: 128, g: 128, b: 0 } },
  { name: "OliveDrab", hex: { r: "6B", g: "8E", b: "23" }, rgb: { r: 107, g: 142, b: 35 } },
  { name: "MediumSeaGreen", hex: { r: "3C", g: "B3", b: "71" }, rgb: { r: 60, g: 179, b: 113 } },
  { name: "LimeGreen", hex: { r: "32", g: "CD", b: "32" }, rgb: { r: 50, g: 205, b: 50 } },
  { name: "Lime", hex: { r: "00", g: "FF", b: "00" }, rgb: { r: 0, g: 255, b: 0 } },
  { name: "SpringGreen", hex: { r: "00", g: "FF", b: "7F" }, rgb: { r: 0, g: 255, b: 127 } },
  { name: "MediumSpringGreen", hex: { r: "00", g: "FA", b: "9A" }, rgb: { r: 0, g: 250, b: 154 } },
  { name: "DarkSeaGreen", hex: { r: "8F", g: "BC", b: "8F" }, rgb: { r: 143, g: 188, b: 143 } },
  { name: "MediumAquamarine", hex: { r: "66", g: "CD", b: "AA" }, rgb: { r: 102, g: 205, b: 170 } },
  { name: "YellowGreen", hex: { r: "9A", g: "CD", b: "32" }, rgb: { r: 154, g: 205, b: 50 } },
  { name: "LawnGreen", hex: { r: "7C", g: "FC", b: "00" }, rgb: { r: 124, g: 252, b: 0 } },
  { name: "Chartreuse", hex: { r: "7F", g: "FF", b: "00" }, rgb: { r: 127, g: 255, b: 0 } },
  { name: "LightGreen", hex: { r: "90", g: "EE", b: "90" }, rgb: { r: 144, g: 238, b: 144 } },
  { name: "GreenYellow", hex: { r: "AD", g: "FF", b: "2F" }, rgb: { r: 173, g: 255, b: 47 } },
  { name: "PaleGreen", hex: { r: "98", g: "FB", b: "98" }, rgb: { r: 152, g: 251, b: 152 } },

  // White colors
  { name: "MistyRose", hex: { r: "FF", g: "E4", b: "E1" }, rgb: { r: 255, g: 228, b: 225 } },
  { name: "AntiqueWhite", hex: { r: "FA", g: "EB", b: "D7" }, rgb: { r: 250, g: 235, b: 215 } },
  { name: "Linen", hex: { r: "FA", g: "F0", b: "E6" }, rgb: { r: 250, g: 240, b: 230 } },
  { name: "Beige", hex: { r: "F5", g: "F5", b: "DC" }, rgb: { r: 245, g: 245, b: 220 } },
  { name: "WhiteSmoke", hex: { r: "F5", g: "F5", b: "F5" }, rgb: { r: 245, g: 245, b: 245 } },
  { name: "LavenderBlush", hex: { r: "FF", g: "F0", b: "F5" }, rgb: { r: 255, g: 240, b: 245 } },
  { name: "OldLace", hex: { r: "FD", g: "F5", b: "E6" }, rgb: { r: 253, g: 245, b: 230 } },
  { name: "AliceBlue", hex: { r: "F0", g: "F8", b: "FF" }, rgb: { r: 240, g: 248, b: 255 } },
  { name: "Seashell", hex: { r: "FF", g: "F5", b: "EE" }, rgb: { r: 255, g: 245, b: 238 } },
  { name: "GhostWhite", hex: { r: "F8", g: "F8", b: "FF" }, rgb: { r: 248, g: 248, b: 255 } },
  { name: "Honeydew", hex: { r: "F0", g: "FF", b: "F0" }, rgb: { r: 240, g: 255, b: 240 } },
  { name: "FloralWhite", hex: { r: "FF", g: "FA", b: "F0" }, rgb: { r: 255, g: 250, b: 240 } },
  { name: "Azure", hex: { r: "F0", g: "FF", b: "FF" }, rgb: { r: 240, g: 255, b: 255 } },
  { name: "MintCream", hex: { r: "F5", g: "FF", b: "FA" }, rgb: { r: 245, g: 255, b: 250 } },
  { name: "Snow", hex: { r: "FF", g: "FA", b: "FA" }, rgb: { r: 255, g: 250, b: 250 } },
  { name: "Ivory", hex: { r: "FF", g: "FF", b: "F0" }, rgb: { r: 255, g: 255, b: 240 } },
  { name: "White", hex: { r: "FF", g: "FF", b: "FF" }, rgb: { r: 255, g: 255, b: 255 } },

  // Gray and black colors
  { name: "Black", hex: { r: "00", g: "00", b: "00" }, rgb: { r: 0, g: 0, b: 0 } },
  { name: "DarkSlateGray", hex: { r: "2F", g: "4F", b: "4F" }, rgb: { r: 47, g: 79, b: 79 } },
  { name: "DimGray", hex: { r: "69", g: "69", b: "69" }, rgb: { r: 105, g: 105, b: 105 } },
  { name: "SlateGray", hex: { r: "70", g: "80", b: "90" }, rgb: { r: 112, g: 128, b: 144 } },
  { name: "Gray", hex: { r: "80", g: "80", b: "80" }, rgb: { r: 128, g: 128, b: 128 } },
  { name: "LightSlateGray", hex: { r: "77", g: "88", b: "99" }, rgb: { r: 119, g: 136, b: 153 } },
  { name: "DarkGray", hex: { r: "A9", g: "A9", b: "A9" }, rgb: { r: 169, g: 169, b: 169 } },
  { name: "Silver", hex: { r: "C0", g: "C0", b: "C0" }, rgb: { r: 192, g: 192, b: 192 } },
  { name: "LightGray", hex: { r: "D3", g: "D3", b: "D3" }, rgb: { r: 211, g: 211, b: 211 } },
  { name: "Gainsboro", hex: { r: "DC", g: "DC", b: "DC" }, rgb: { r: 220, g: 220, b: 220 } },
];

function adjustColor(hex, percent) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Calcula a luminância da cor
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    if (luminance > 58) {
        // Se a cor é clara, escurece
        r = Math.floor(r * (1 - percent / 100));
        g = Math.floor(g * (1 - percent / 100));
        b = Math.floor(b * (1 - percent / 100));
    } else {
        // Se a cor é escura, clareia
        r = Math.floor(r + (255 - r) * (percent / 200));
        g = Math.floor(g + (255 - g) * (percent / 200));
        b = Math.floor(b + (255 - b) * (percent / 200));
    }

    r = r < 0 ? 0 : r > 255 ? 255 : r;
    g = g < 0 ? 0 : g > 255 ? 255 : g;
    b = b < 0 ? 0 : b > 255 ? 255 : b;

    const newHex = `#${(r * 0x10000 + g * 0x100 + b).toString(16).padStart(6, '0')}`;

    return newHex;
}

export default adjustColor;
export function declensionOfWords(count: number, wordForms: [string, string, string]) {
    return wordForms[(count % 100 > 4 && count % 100 < 20) ? 2
        : [2, 0, 1, 1, 1, 2][(count % 10 < 5) ? Math.abs(count) % 10 : 5]];
}

export const formWordTrack = (count: number) => declensionOfWords(count, ['трек','трека','треков']);
export const formWordAlbum = (count: number) => declensionOfWords(count, ['альбом','альбома','альбомов']);

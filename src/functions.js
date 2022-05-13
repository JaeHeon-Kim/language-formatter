export const formattingTwoLanguage = (phraseWording, translatedWording) => {
    const formattedWording = {};

    const separatedPhraseWording = languageSeparator(phraseWording);
    const separatedTranslatedWording = languageSeparator(translatedWording);

    const listOfPhraseWording = languageFilter(separatedPhraseWording, phraseWording);
    const listOfTranslatedWording = languageFilter(separatedTranslatedWording, translatedWording);

    for (let i = 0; i < listOfPhraseWording.length; i++) {
        formattedWording[listOfPhraseWording[i]] = listOfTranslatedWording[i];
    }
    return formattedWording;
};

const languageSeparator = (language) => {
    return JSON.stringify(language).replace('"', '').split(/[:|,]/);
};
const languageFilter = (separatedLanguage, language) => {
    return separatedLanguage.filter((language, index) => {
        if (index % 2 === 1) {
            return language;
        }
    });
};

export function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

export const objectToArray = (wording) => {
    return Object.values(wording);
};

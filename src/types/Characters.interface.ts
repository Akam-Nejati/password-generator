export default interface Characters {
    [key: string]: string[];
    lowercaseCharacters: string[],
    uppercaseCharacters: string[],
    symbols: string[],
    numbers: string[],
    ambiguousCharacters: string[],
}
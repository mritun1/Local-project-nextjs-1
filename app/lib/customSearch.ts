export default class customSearch{

    searchByCommaSeparated(text:string,commaSeparatedText:string){
        const smallString = text.toLocaleLowerCase();
        const wordsToCheck = commaSeparatedText.split(",");
        const containsWord = wordsToCheck.some(word => smallString.includes(word));
        if (containsWord) {
            return true;
        } 
        return false;
    }

}
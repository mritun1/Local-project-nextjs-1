export default class customMath{

    public randomNum(num:number){
        // Generate a random number between 0 (inclusive) and 1 (exclusive)
        const randomNumber = Math.random();
        // You can scale the random number to a desired range if needed
        // For example, to generate a random number between 1 and 100:
        const scaledRandomNumber = Math.floor(randomNumber * num) + 1;
        return scaledRandomNumber;
    };

}
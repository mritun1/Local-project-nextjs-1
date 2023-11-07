export default class customDate{

    millisecondToString(formatType: string, timestamp:number){

        // Create a Date object from the timestamp
        const date = new Date(timestamp);

        // Define month names
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        // Extract day, month, and year components from the Date
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year

        // Format the date in the desired format
        let formattedDate:String = '';

        if(formatType === 'dmy'){
            formattedDate = `${day} ${month},${year}`;
        }

        return formattedDate;

    }

    isoToInput(dateStr:string){
        const dateObject = new Date(dateStr);
        // Format the date as "YYYY-MM-DD"
        const formattedDate = dateObject.toISOString().split('T')[0];
        return formattedDate;
    }

}
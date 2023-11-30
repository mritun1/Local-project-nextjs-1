export default class customDate{

    currentDate(formatType:string){
        const currentDate = new Date();

        if (formatType == 'MonthName'){
            const currentMonth = currentDate.getMonth();
            // Array of month names
            const monthNames = [
                'January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'
            ];

            // Get the month name based on the current month
            return monthNames[currentMonth];
        }
    }

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

    isoToMonth(inputDateString:string){
        //const inputDateString = "2023-11-03T00:00:00.000Z";
        const dateObject = new Date(inputDateString);

        const day = dateObject.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObject);

        const formattedDate = `${day} ${month}`;
        //console.log(formattedDate); // Output: 3 Nov
        return formattedDate;
    }

}
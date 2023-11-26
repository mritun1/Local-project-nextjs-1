

export default class sms{
    //SEND SINGLE OTP
    async singleOTP(number:string,otp:string){
        try{
            
            var unirest = require("unirest");

            var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

            const apiKey: string | undefined = process.env.SMS_API_KEY
            req.headers({
                'authorization': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            });
            req.form({
                'variables_values': `${otp}`,
                'route': 'otp',
                'numbers': `${number}`,
            });

            req.end(function (res: any) {
                console.log(res.body + apiKey);
                return 1;
            });
            
        }catch(error){
            return null;
        }
    }
}
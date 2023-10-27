export default class validate{

    public password(e:string){
        if (e.length > 8) {
            return true
        }
        return false
    }

    public mobile(e:number){
        const num:string = e.toString()
        const numCount = num.length
        if (numCount >= 10){
            return true
        }
        return false
    }

    public pinCode(e: number) {
        const num: string = e.toString()
        const numCount = num.length
        if (numCount >= 6) {
            return true
        }
        return false
    }

}
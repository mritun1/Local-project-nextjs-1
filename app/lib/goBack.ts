import Cookies from "js-cookie";
import StackDS from "./dsa/stack/stack";

export default class goBack{
    cookieName:any;
    cookieData;
    Stack;
    constructor(){
        this.cookieName = "SlEH23slsS2"
        this.cookieData = JSON.parse(Cookies.get(this.cookieName) || '[]');
        this.Stack = new StackDS(this.cookieData);
    }

    setHistory(pathname:string){
        //Insert Path to the stack
        try {
            this.Stack.filterRemove(pathname) //Remove similar items, first
            this.Stack.push(pathname);
            Cookies.set(this.cookieName, JSON.stringify(this.Stack.items), { expires: 1 });
        } catch (error) {
            console.error('Error handling cookies:', error);
        }
    }

    getUrl(){
        return this.Stack.peek();
    }
}

export default class StackDS{
    items:Array<string>;
    constructor(oldItems:Array<string>){
        this.items = [];
        if(oldItems.length != 0){
            oldItems.map((ele)=>{
                this.items.push(ele)
            })
        }
    }

    //Push element to the top
    push(ele:string){
        if(ele != this.peek()){
            this.items.push(ele);
        }
    }
    //Pop element from the top
    pop(){
        if(this.items.length === 0){
            return "underflow";
        }
        this.items.pop();
    }
    //Peek at the element of the top
    peek(){
        if (this.items.length != 0) {
            return this.items[this.items.length - 1];
        }
        return '';
    }
    //Check if it is empty
    isEmpty(){
        return this.items.length === 0;
    }
    //Size of the stack
    size(){
        return this.items.length;
    }
    //Clear the stack
    clear(){
        this.items = [];
    }
    //Remove all this value
    filterRemove(ele:string){
        this.items.forEach((el,index)=>{
            if(ele === el){
                this.items.splice(index,1)
            }
        })
    }
   
}
import DoublyCircularLinkedList from "./linkedList/circularLinkedList";

export default class SlideShow{
    list = new DoublyCircularLinkedList();

    constructor(images:Array<string>){
        images.map(ele=>{
            this.list.append(ele)
        })
    }

    printFirst(){
        return this.list.printFirstElement();
    }

}
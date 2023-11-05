import CustomNode from "../customNode";

export default class LinkedList {
    head: CustomNode | null;

    constructor() {
        this.head = null;
    }

    insertToArray(data: any) {
        const newNode = new CustomNode(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    //Get the count of linkedList
    count(){
        let node = this.head;
        let count = 0;
        while(node !== null){
            count++;
            node = node.next;
        }
        return count;
    }

    //return the linkedList
    printArray() {
        let current = this.head;
        let result:Array<any> = []
        while (current !== null) {
            result.push(current.data)
            current = current.next;
        }
        return result
    }

}
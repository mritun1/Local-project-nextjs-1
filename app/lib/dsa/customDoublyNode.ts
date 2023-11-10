export default class customDoublyNode {
    data: any;
    next: customDoublyNode | null;
    prev: customDoublyNode | null;
    constructor(data:any) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
export default class CustomNode {
    data: any;
    next: CustomNode | null;

    constructor(data: any, next: CustomNode | null = null) {
        this.data = data;
        this.next = next;
    }
}
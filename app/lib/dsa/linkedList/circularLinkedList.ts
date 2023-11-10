import customDoublyNode from "../customDoublyNode";

export default class DoublyCircularLinkedList {
    head: customDoublyNode | null;
    current: customDoublyNode | null;

    constructor() {
        this.head = null;
        this.current = null;
    }

    // Function to insert a node at the end of the doubly circular linked list
    append(data:any) {
        const newNode = new customDoublyNode(data);

        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
            this.current = newNode;
        } else {
            const tail:any = this.head.prev;
            tail.next = newNode;
            newNode.prev = tail;
            newNode.next = this.head;
            this.head.prev = newNode;
        }
    }

    getNextData(): any | null {
        if (!this.current) {
            return null;
        }
        const nextNode = this.current.next;
        if (nextNode) {
            this.current = nextNode;
            return nextNode.data;
        } else {
            return null; // Reached the end of the list
        }
    }

    getPrevData(): any | null {
        if (!this.current) {
            return null;
        }
        const prevNode = this.current.prev;
        if (prevNode) {
            this.current = prevNode;
            return prevNode.data;
        } else {
            return null; // Reached the end of the list
        }
    }

    printFirstElement() {
        if (this.head) {
            return this.head.data;
        } else {
            return null;
        }
    }
}
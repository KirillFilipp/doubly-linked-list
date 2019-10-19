const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);
        if (!this._head || this.length == 0) {
            this._head = node;
            this._tail = node;
        } else {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
        }
        this.length++;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        let current = this._head;
        let counter = 0;
        while (counter < index) {
            current = current.next;
            counter++;
        }

        return current.data;
    }

    insertAt(index, data) {
        let current = this._head;
        let counter = 1;
        let node = new Node(data);
        if (this._head === null) {
            this._head = node;
            this._tail = node;
            this.length++;
            return this._head;
        } else if (index == 0) {
            this._head.prev = node;
            node.next = this._head;
            this._head = node;
            return this._head;
        } else {
            while (current) {
                current = current.next;
                if (counter == index) {
                    node.prev = current.prev;
                    current.prev.next = node;
                    node.next = current;
                    current.prev = node;
                    break;
                }

                counter++;
            }
        }
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length < 1;
    }

    clear() {
        this._head.data = null;
        this._tail.data = null;
        this.length = 0;
    }

    deleteAt(index) {
        let current = this._head;
        let counter = 1;
        if (index == 0) {
            this._head = this._head.next;
            this._head.prev = null;
        } else {
            while (current) {
                current = current.next;
                if (current == this._tail) {
                    this._tail = this._tail.prev;
                    this._tail.next = null;
                } else if (counter == index) {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    break;
                }
                counter++;
            }
        }
        this.length--;
        return this;
    }

    reverse() {
        let current = this._head;
        let prev = null;
        while (current) {
            let next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }
        this._tail = this._head;
        this._head = prev;
        return this;
    }

    indexOf(data) {
        let current = this._head;
        let counter = 0;
        while (counter < this.length) {
            if (current.data == data) {
                return counter;
            } else {
                current = current.next;
                counter++;
            }
        }
        return -1;
    }
}

module.exports = LinkedList;

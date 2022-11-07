class BookStore {
    bookStoreName: string;

    constructor(bookStoreName: string) {
        this.bookStoreName = bookStoreName;
    }
}

class Book extends BookStore {
    bookName: string;
    isbnNumber: string;
    authorName: string;
    publisher: string;

    constructor(bookName: string, isbnNumber: string, authorName: string, publisher: string, bookStoreName: string) {
        super(bookStoreName);
        this.bookName = bookName;
        this.isbnNumber = isbnNumber;
        this.authorName = authorName;
        this.publisher = publisher;
    }

    getBookInfo() {
        return `Book ${this.bookName} with ISBN number ${this.isbnNumber} has been written by ${this.authorName} and published by ${this.publisher} from Bookstore ${this.bookStoreName}`;
    }
}

let exampleBook = new Book('Harry Potter', '123-456-789', 'JK Rowling', 'Penguin Books', 'Waterstones');
console.log(exampleBook.getBookInfo());
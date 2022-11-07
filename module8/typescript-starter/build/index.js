"use strict";
// Create a class named Book with following properties bookName, isbnNumber, authorName, Publisher. 
// Create constructor that should initialise the instance variables. 
// Create parent class  "BookStore" which has properties bookstoreName. 
// Create getBookInfo method in Book class which returns the descriptive info of the book as a string 
// "Bookxxx with ISBN number xxx has been written by authorxxx and published by xxxx from Bookstorexxx"
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BookStore = /** @class */ (function () {
    function BookStore(bookStoreName) {
        this.bookStoreName = bookStoreName;
    }
    return BookStore;
}());
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(bookName, isbnNumber, authorName, publisher, bookStoreName) {
        var _this = _super.call(this, bookStoreName) || this;
        _this.bookName = bookName;
        _this.isbnNumber = isbnNumber;
        _this.authorName = authorName;
        _this.publisher = publisher;
        return _this;
    }
    Book.prototype.getBookInfo = function () {
        return "Book ".concat(this.bookName, " with ISBN number ").concat(this.isbnNumber, " has been written by ").concat(this.authorName, " and published by ").concat(this.publisher, " from Bookstore ").concat(this.bookStoreName);
    };
    return Book;
}(BookStore));
var exampleBook = new Book('Harry Potter', '123-456-789', 'JK Rowling', 'Penguin Books', 'Waterstones');
console.log(exampleBook.getBookInfo());

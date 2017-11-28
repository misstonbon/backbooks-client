
import $ from 'jquery';
import _ from 'underscore';
import 'foundation-sites/dist/css/foundation.css';
import './style.css';
import Book from './models/book';
import Cat from './models/cat';
import BookList from './collections/book_list';
import CatList from './collections/cat_list';

const codingInterview = new Book({
  title: "Cracking the Coding Interview",
  author: "Gale",
  publication_year: 2011,
});

const jeeves = new Cat({
  name: "Jeeves",
  human: "Shaunna",
  species: "Just kidding, I'm a dog.",
});


const rawBookData = [
  {
    title: 'Practical Object-Oriented Design in Ruby',
    author: 'Sandy Metz',
    publication_year: 2012
  }, {
    title: 'Parable of the Sower',
    author: 'Octavia Butler',
    publication_year: 1993
  }, {
    title: 'A Wizard of Earthsea',
    author: 'Ursula K. Le Guin',
    publication_year: 1969
  }
];

const bookList = new BookList(rawBookData);
bookList.add(codingInterview);

bookList.add({
  title: "Gatsby",
  author: "Fitzgerald",
  publication_year: 1922,
});

bookList.forEach((book) => {
  console.log(`${book.get('title')} by ${book.get('author')}`);
});

const newBooks = bookList.filter((book) => book.get('publication_year') > 2000);

newBooks.forEach((book) => {
  console.log(`AAAAAAAAAAA ${book.get('title')} is a newer book !!`)
});

const shaunnasCat = new Cat({
  name: "Jeeves",
  human: "Shaunna",
  species: "Just kidding, I'm a dog.",
});
const rawCatData = [
  {
  name: "Some cat",
  human: "Chris",
},
  {
  name: "Jerry",
  human: "Tanja",
}
]

const catList = new CatList(rawCatData);
catList.add(jeeves);

catList.add({
  name: "Riley",
  human: "Dee",
});

catList.forEach((cat) => {
  console.log(` CAAAAAAAAAAAATS ${cat.get('name')}`);
});

console.log(catList);
console.log(catList.at(1).get('name'));

console.log(bookList);
console.log(bookList.at(2).get('title'));

// codingInterview.attributes.title = "Cracking the Whiteboarding Interview";
// never change attrs directly
// bypasses validations
// codingInterview.attributes to read attrs
// get and set in backbone
console.log(`Title is ${codingInterview.get('title')}`);

codingInterview.set('title','The lord of the flies');
//this will change the title and alert any listeners of the change


// Starts undefined - we'll set this in $(document).ready
// once we know the template is available
let bookTemplate;

const render = function render(bookList) {

  //get alement to append to
  const $bookList = $('#book-list');
  $bookList.empty();
  bookTemplate = _.template($('#book-template').html());
  //build forEach loop;
  bookList.forEach((book) => {
    $bookList.append(bookTemplate(book.attributes));
    // $bookList.append(bookTemplate(book.toJSON);
    //can also do it this way ;
  });
};


$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());

  $('#bookList').append(bookTemplate(codingInterview.attributes));
  $('#bookList').append(bookTemplate(codingInterview.toJSON()));
  render (bookList);
});

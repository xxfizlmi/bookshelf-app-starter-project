
let books = [];


const bookForm = document.getElementById('bookForm');
const searchForm = document.getElementById('searchBook');
const incompleteBookList = document.getElementById('incompleteBookList');
const completeBookList = document.getElementById('completeBookList');


function generateId() {
  return Date.now();
}


function createBookElement(book) {
  const bookItem = document.createElement('div');
  bookItem.setAttribute('data-bookid', book.id);
  bookItem.setAttribute('data-testid', 'bookItem');

  bookItem.innerHTML = `
    <h3 data-testid="bookItemTitle">${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
    <p data-testid="bookItemYear">Tahun: ${book.year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
      <button data-testid="bookItemDeleteButton">Hapus Buku</button>
      <button data-testid="bookItemEditButton">Edit Buku</button>
    </div>
  `;


  bookItem.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => toggleBookStatus(book.id));
  

  bookItem.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => deleteBook(book.id));
  

  bookItem.querySelector('[data-testid="bookItemEditButton"]').addEventListener('click', () => editBook(book.id));

  return bookItem;
}


function addBook(title, author, year, isComplete) {
  const newBook = {
    id: generateId(),
    title,
    author,
    year,
    isComplete
  };
  
  books.push(newBook);
  renderBooks();
}


function deleteBook(id) {
  books = books.filter(book => book.id !== id);
  renderBooks();
}


function toggleBookStatus(id) {
  const book = books.find(book => book.id === id);
  if (book) {
    book.isComplete = !book.isComplete;
    renderBooks();
  }
}


function editBook(id) {
  const book = books.find(book => book.id === id);
  if (book) {
    document.getElementById('bookFormTitle').value = book.title;
    document.getElementById('bookFormAuthor').value = book.author;
    document.getElementById('bookFormYear').value = book.year;
    document.getElementById('bookFormIsComplete').checked = book.isComplete;
    
    deleteBook(id); 
  }
}


function renderBooks() {
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  books.forEach(book => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
}


bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = document.getElementById('bookFormYear').value;
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  addBook(title, author, year, isComplete);
  bookForm.reset();
});


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('searchBookTitle').value.toLowerCase();

  if (query) {
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
    renderFilteredBooks(filteredBooks);
  } else {
    renderBooks(); 
  }
});


function renderFilteredBooks(filteredBooks) {
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  filteredBooks.forEach(book => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
}


renderBooks();

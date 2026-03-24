const myLibrary = [];

function Book(title, author, pages, read) {
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.toggleRead = function() {
	this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages,read);
	myLibrary.push(book);
}

//Add some test books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("Dune", "Frank Herbert", 412, true);

console.log(myLibrary);


function displayBook(){
	const grid = document.getElementById('library-grid');
	grid.innerHTML = '';

	myLibrary.forEach(book => {
		const card = document.createElement('div');
		card.classList.add('book-card');
		card.dataset.id = book.id;
	
		card.innerHTML = `
		<h3>${book.title}</h3>
		 <p><strong>Author:</strong> ${book.author}</p>
     <p><strong>Pages:</strong> ${book.pages}</p>
     <p class="read-status ${book.read ? 'read' : 'unread'}">
		   ${book.read ? '✅ Read' : '❌ Not Read'}
		 </p>
		 <div class="card-buttons">
        <button class="toggle-btn">Toggle Read</button>
        <button class="remove-btn">Remove</button>
      </div>
    `;

		 grid.appendChild(card);
	})
}

displayBook();

document.getElementById('library-grid').addEventListener('click', (e) => {
	const card = e.target.closest('.book-card');
	if (!card) return;

	const bookId = card.dataset.id;
	const book = myLibrary.find(b => b.id === bookId);

	if (e.target.classList.contains('remove-btn')) {
		const index = myLibrary.indexOf(book);
		myLibrary.splice(index, 1);
		displayBook();
	}

	if (e.target.classList.contains('toggle-btn')){
		book.toggleRead();
		displayBook();
	}
});

const dialog = document.getElementById('book-dialog');
const newBookBtn = document.getElementById('new-book-btn');
const cancelBtn = document.getElementById('cancel-btn');
const bookForm = document.getElementById('book-form');

newBookBtn.addEventListener('click', () => dialog.showModal());
cancelBtn.addEventListener('click', () => dialog.close());

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

	addBookToLibrary(title, author, pages, read);
  displayBook();
  bookForm.reset();
  dialog.close();
});
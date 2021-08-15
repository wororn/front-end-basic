const UNFIXED_BOOKSHELF_ID = "UnfixedBookshelfList";
const FIXED_BOOKSHELF_ID = "FixedBookshelfList";
const BOOKS_ITEMID = "itemId";

function addBook() {
    const UnfixedBookshelfList = document.getElementById(UNFIXED_BOOKSHELF_ID);
    const FixedBookshelfList = document.getElementById(FIXED_BOOKSHELF_ID);
    const completeCheck = document.getElementById("isComplete");


    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookYear = document.getElementById("year").value;

    const book = makeBook(bookTitle, bookAuthor, bookYear, completeCheck.checked);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, completeCheck.checked);
    
    book[BOOKS_ITEMID] = bookObject.id;
    books.push(bookObject);

     if (completeCheck.checked == true) {
         FixedBookshelfList.append(book);
     } else {
         UnfixedBookshelfList.append(book);
     }

    updateDataToStorage();

    document.getElementById("title").value="";
    document.getElementById("author").value="";
    document.getElementById("year").value="";

}


function makeBook(data, author, year, isComplete) {

    const textTitle = document.createElement("h3");
    textTitle.innerText = data;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = "Penulis : "+author;

    const numberYear = document.createElement("p");
    numberYear.innerText = "Tahun Terbit : "+year;

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item")
    textContainer.append(textTitle, textAuthor, numberYear);

  

    if (isComplete) {
        textContainer.append(
            createUndoButton(),
            createDeleteButton()
        );
    } else {
        textContainer.append(
            createDoneButton(),
            createDeleteButton(),
            
           
        );
    }

    return textContainer;
}

function searchBook(listTitle) {
const listArticle=document.querySelectorAll('article');
let i=0;
for (book of listArticle) {
        if (listTitle !=''){
                if (listArticle[i].childNodes[0].innerText != listTitle){
                    listArticle[i].setAttribute("hidden","hidden");
                  } 
        } else { 
                listArticle[i].removeAttribute("hidden");
                            
        }
    i++;
    }
    document.getElementById("searchTitle").value="";   
}

function createButton(buttonTypeClass, buttonName,eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonName;
    button.addEventListener("click", function (event) {
        eventListener(event);
         event.stopPropagation();
    });    
    return button;
}

function createUndoButton() {
    return createButton("undo-button", "   Batal   " , function (event) {
        
        undoTaskFromCompleted(event.target.parentElement);
      
    });
}

function createDeleteButton() {

     return createButton("delete-button", "   Hapus   " , function (event) {
        removeTaskFromAllKind(event.target.parentElement);
    });      

}

function createDoneButton() {
    return createButton("done-button","   Selesai   ", function (event) {
        addTaskToCompleted(event.target.parentElement);       
    });
    
}

function addTaskToCompleted(taskElement) {

    let pesan = confirm("Apa anda yakin untuk memindahkan buku ke rak SELESAI DIBACA ?");

	if (pesan == true) {
            const FixedBookshelfList = document.getElementById(FIXED_BOOKSHELF_ID);
        
            const taskTitle = taskElement.querySelector("h3").innerText;
            const taskAuthor = taskElement.querySelector("p").innerText;
            const taskYear = taskElement.querySelector("p").innerText;

            const newBook = makeBook(taskTitle, taskAuthor, taskYear, true);
            

            const book = findBook(taskElement[BOOKS_ITEMID]);
            book.isComplete = true;
            newBook[BOOKS_ITEMID] = book.id;

            FixedBookshelfList.append(newBook);
            taskElement.remove();

            updateDataToStorage();

    } else {
        return 0;
    }

}

function addTaskToInCompleted(taskElement) {

    let pesan = confirm("Apa anda yakin untuk memindahkan buku ke rak BELUM SELESAI DIBACA ?");

	if (pesan == true) {

            const UnfixedBookshelfList = document.getElementById(UNFIXED_BOOKSHELF_ID);
        
            const taskTitle = taskElement.querySelector("h3").innerText;
            const taskAuthor = taskElement.querySelector("p").innerText;
            const taskYear = taskElement.querySelector("p").innerText;

            const newBook = makeBook(taskTitle, taskAuthor, taskYear, false);
            

            const book = findBook(taskElement[BOOKS_ITEMID]);
            book.isComplete = false;
            newBook[BOOKS_ITEMID] = book.id;

            UnfixedBookshelfList.append(newBook);
            taskElement.remove();

            updateDataToStorage();

        } else {
            return 0;
    }

}

function removeTaskFromAllKind(taskElement) {

    let pesan = confirm("Apa anda yakin untuk MENGHAPUS buku dari rak ?");

	if (pesan == true) {
	
            const bookPosition = findBookIndex(taskElement[BOOKS_ITEMID]);
            books.splice(bookPosition, 1);

            taskElement.remove();
            updateDataToStorage();

    } else {
            return 0;
     }
        
}

function undoTaskFromCompleted(taskElement) {
    let pesan = confirm("Apa anda yakin untuk memindahkan buku ke rak BELUM SELESAI DIBACA ?");

	if (pesan == true) {
            const UnfixedBookshelfList = document.getElementById(UNFIXED_BOOKSHELF_ID);
            const taskTitle = taskElement.querySelector(".book_item > h3").innerText;
            const taskAuthor = taskElement.querySelector(".book_item > p").innerText;
            const taskYear =  taskElement.querySelector(".book_item > p").innerText;

            const newBook = makeBook(taskTitle, taskAuthor, taskYear, false);

            const book = findBook(taskElement[BOOKS_ITEMID]);
            book.isComplete = false;
            newBook[BOOKS_ITEMID] = book.id;

            UnfixedBookshelfList.append(newBook);
            taskElement.remove();
            
            updateDataToStorage();

    } else {
            return 0;
    }

}

function refreshDataFromBooks() {
    
    const UnfixedBookshelfList = document.getElementById(UNFIXED_BOOKSHELF_ID);
    const FixedBookshelfList = document.getElementById(FIXED_BOOKSHELF_ID);

    for(book of books){
        const newBook = makeBook(book.title, book.author, book.year, book.isComplete);
        newBook[BOOKS_ITEMID] = book.id;

        if(book.isComplete){
            FixedBookshelfList.append(newBook);
        } else {
            UnfixedBookshelfList.append(newBook);
        }
    }
    updateDataToStorage();
}
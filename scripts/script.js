document.addEventListener("DOMContentLoaded", function () {
 
    const bookSubmit = document.getElementById("inputBook");
    const searchSubmit = document.getElementById("searchBook");
    const refresh =document.getElementById("refresh");
    
    bookSubmit.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    searchSubmit.addEventListener("submit", function (event) {
        
        const listTitle = document.getElementById("searchTitle").value;
 
        event.preventDefault();
       
        searchBook(listTitle);
        
    });

    refresh.addEventListener("submit", function (event) {
       
        event.preventDefault();
       
        refreshDataFromBooks();
       
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }

});
 
document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});
 
document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});
let page = 1;
let count = 0;
let globalBooks = [];

function generateRandomSeed() {
    document.getElementById("seed").value = Math.floor(100000 + Math.random() * 900000);
}

document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
});

function attachChevronToggleListeners() {
    document.querySelectorAll('.arrow-icon').forEach(icon => {
        const chevron = icon.querySelector('i');
        const targetId = icon.getAttribute('href');
        const target = document.querySelector(targetId);
        
        target.addEventListener('show.bs.collapse', () => {
            chevron.classList.remove('bi-chevron-down');
            chevron.classList.add('bi-chevron-up');
        });

        target.addEventListener('hide.bs.collapse', () => {
            chevron.classList.remove('bi-chevron-up');
            chevron.classList.add('bi-chevron-down');
        });
    });
}

function loadBooks() {
    const settings = {
        seed: document.getElementById("seed").value,
        languageRegion: document.getElementById("language").value,
        avgLikes: document.getElementById("avgLikes").value,
        avgReviews: document.getElementById("avgReviews").value,
        pageNumber: page
    };

    page = 1;
    count = 0;
    const tableBody = document.querySelector("#booksTable tbody");
    tableBody.innerHTML = "";   

    axios.post('https://localhost:7147/Books/Generate', settings)
        .then(response => {
            const tableBody = document.querySelector("#booksTable tbody");
            response.data.forEach((book,i) => {
                count++;
                response.data[i].index = count;
                globalBooks.push(response.data[i]);
                const row = `<tr>
                          <td class="text-start">
                            <span class="arrow-icon text-dark" data-bs-toggle="collapse" href="#book${count}" role="button" aria-expanded="false" aria-controls="book${count}">
                                <i class="bi bi-chevron-down"></i> 
                            </span> ${count} 
                          </td>
                          <td>${book.isbn}</td>
                          <td>${book.title}</td>
                          <td>${book.author}</td>
                          <td>${book.publisher}</td>
                    </tr>
                    <tr class="collapse" id="book${count}">
                          <td colspan="5">
                             <div class="row">
                                 <div class="col-md-3 col-sm-4 text-center mb-2">
                                     <img src="${book.imageUrl}" alt="Book Cover" class="img-fluid rounded">
                                 </div>
                                 <div class="col-md-9 col-sm-8">
                                     <div class="review-card">
                                         <h5>${book.title}</h5>
                                         <p><strong>By:</strong> ${book.author}</p>
                                         <p><strong>Publisher:</strong> ${book.publisher}</p>
                                         <hr>
                                         <h6> Review </h6>
                                         ${book.reviews.map(review => `<p>- ${review}</p>`).join("")}
                                     </div>
                                 </div>
                             </div>
                        </td>
                    </tr>`;
                tableBody.insertAdjacentHTML("beforeend", row);
            });
            attachChevronToggleListeners();
    }).then((error) => console.log(error));
}
function addBooks() {
    const settings = {
        seed: document.getElementById("seed").value,
        languageRegion: document.getElementById("language").value,
        avgLikes: document.getElementById("avgLikes").value,
        avgReviews: document.getElementById("avgReviews").value,
        pageNumber: page
    };
        const tableBody = document.querySelector("#booksTable tbody");

    axios.post('https://localhost:7147/Books/Generate', settings)
        .then(response => {
            const tableBody = document.querySelector("#booksTable tbody");
            response.data.forEach((book, i) => {
                count++;
                response.data[i].index = count;
                globalBooks.push(response.data[i]);
                const row = `<tr>
                          <td class="text-start">
                            <span class="arrow-icon text-dark" data-bs-toggle="collapse" href="#book${count}" role="button" aria-expanded="false" aria-controls="book${count}">
                                <i class="bi bi-chevron-down"></i> 
                            </span> ${count} 
                          </td>
                          <td>${book.isbn}</td>
                          <td>${book.title}</td>
                          <td>${book.author}</td>
                          <td>${book.publisher}</td>
                    </tr>
                    <tr class="collapse" id="book${book.index}">
                          <td colspan="5">
                             <div class="row">
                                 <div class="col-md-3 col-sm-4 text-center mb-2">
                                     <img src="${book.imageUrl}" alt="Book Cover" class="img-fluid rounded">
                                 </div>
                                 <div class="col-md-9 col-sm-8">
                                     <div class="review-card">
                                         <h5>${book.title}</h5>
                                         <p><strong>By:</strong> ${book.author}</p>
                                         <p><strong>Publisher:</strong> ${book.publisher}</p>
                                         <hr>
                                         <h6> Review </h6>
                                         ${book.reviews.map(review => `<p>- ${review}</p>`).join("")}
                                     </div>
                                 </div>
                             </div>
                        </td>
                    </tr>`;
                tableBody.insertAdjacentHTML("beforeend", row);
            });
            attachChevronToggleListeners();
        }).then((error) => console.log(error));
}


window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        page++;
        console.log(page);
        addBooks();
    }
});

document.getElementById("exportButton").addEventListener("click", () => {
    
    axios.post('https://localhost:7147/Books/Export', globalBooks, { responseType: 'blob' })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'books.csv'); 
            document.body.appendChild(link);
            link.click(); 
            document.body.removeChild(link); 
        })
    .catch(error => console.error("Error exporting books:", error));
});



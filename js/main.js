// loadCategories, categories, categoriesList, displayCategories
const loadedNewsCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category));
}

const displayCategories = categories => {
    const categoriesList = document.getElementById('categories-list');
    categories.forEach(category => {
        const ulList = document.createElement('li');
        ulList.classList.add('nav-item');
        ulList.innerHTML = `
        <button id="btnId" type="button" class="btn m-2 border active"onclick="loadedNews('${category.category_id}')" >${category.category_name}<span id="lengthNum" class="badge bg-warning ms-1"></span>
        </button>
        `;
        categoriesList.appendChild(ulList);
    })
}
// All News categories

const loadedNews = async (category_id) => {
    // console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    toggleSpinner(true);
    const res = await fetch(url);
    const data = await res.json();
    cardList(data.data);
}

const cardList = cards => {
    const cardsId = document.getElementById('card-list');
    cardsId.textContent = '';
    const noNews = document.getElementById('alartMess');
    if (cards.length === 0) {
        noNews.classList.remove('d-none');
    } else {
        noNews.classList.add('d-none')
    }

    cards.forEach(card => {
        const lengthNum = document.getElementById('newsLengthField');
        const lengthValue = lengthNum.innerText = Object.keys(cards).length;

        const div = document.createElement('div');
        div.classList.add('col-12', 'gy-4');
        div.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-3">
                        <img src="${card.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-8">
                        <div class="card-body">
                            <h3 class="card-title">${card.title}</h3>
                            <p class="card-text">${card.details.slice(0, 300)}...</p>
                            
                            <div>
                            <div class="row">
                            <div class="col">
                                <div class="row g-0 d-flex justify-content-start align-items-center">
                                    <div class="col-3">
                                        <img src="${card.author.img}" class="img-fluid rounded" alt="...">
                                    </div>
                                    <div class="col-9">
                                        <div class="card-body">
                                            <h5 class="card-title text-primary">${card.author.name ? card.author.name : 'Not Found'}</h5>
                                            <p class="card-text"><small class="text-muted">${card.author.published_date}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-center align-items-center">
                                <i class="fa-solid fa-eye px-2 text-danger"></i>
                                <h6 class="fw-bold m-0">${card.total_view ? card.total_view : 'No Rating'}</h6>
                            </div>
                            <div class="col d-flex justify-content-center align-items-center">
                                <h6 class="fw-bold">${card.rating.number} <i class="fa-solid fa-star"></i></h6>
                            </div>
                            <div class="col-1 d-flex justify-content-end align-items-center">
                                <i class="fa-sharp fa-solid fa-arrow-right text-primary"></i>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardsId.appendChild(div)
    })
    toggleSpinner(false);
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}

loadedNews('01');
loadedNewsCategories();
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

    // const lengthNum = document.getElementById('newsLengthField');
    //     if (cards.length == 0) {
    //         spinner(false);
    //         lengthNum.innerText = 'No'
    //     } else {
    //         lengthNum.innerText = cards.length;
    //     }


    const noNews = document.getElementById('alartMess');
    if (cards.length === 0) {
        noNews.classList.remove('d-none');
    } else {
        noNews.classList.add('d-none')
    }

    const sortedAllNews = cards.sort((a, b) => b.total_view - a.total_view);
    cards.forEach(card => {
        const lengthNum = document.getElementById('newsLengthField');
        const lengthValue = lengthNum.innerText = Object.keys(cards).length;

        const div = document.createElement('div');
        div.classList.add('col-12', 'gy-4');
        div.innerHTML = `
            <div class="card mb-3">
                <div class="row">
                    <div class="col-12 col-md-12 col-lg-3">
                        <img src="${card.image_url}" class="img-fluid img-thumbnail rounded img" alt="...">
                    </div>
                    <div class="col-12 col-md-12 col-lg-8">
                        <div class="card-body">
                            <h3 class="card-title">${card.title}</h3>
                            <p class="card-text">${card.details.slice(0, 300)}...</p>
                            
                            <div>
                            <div class="row">
                            <div class="col-12 col-md col-lg">
                                <div class="row g-0 d-flex justify-content-start align-items-center">
                                    <div class="col-3 ">
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
                                <h6 class="fw-bold">${card.rating.number} <i class="fa-solid fa-star text-warning"></i></h6>
                            </div>
                            <div class="col-1 d-flex justify-content-end align-items-center">

                                <button onclick="loadedNewsDetails('${card._id}')" type="button" class="border-0 bg-white" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-sharp fa-solid fa-arrow-right text-primary"></i>
                                </button>
                                
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


const loadedNewsDetails = news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}
    `
    fetch(url)
        .then(res => res.json())
        .then(data => arrowBtnFun(data.data[0]))
}

const arrowBtnFun = card => {
    const modalTitels = document.getElementById('staticBackdropLabel');
    modalTitels.innerText = card.title;

    const newsModel = document.getElementById('newsModel');
    newsModel.innerHTML = `
        <img src="${card.image_url}" class="card-img-top mb-2" alt="...">
        <p class="card-text">${card.details}</p>
        <div class="d-flex justify-content-start align-items-center">
            <h6 class="fw-bold">Rating: <small class="fw-light">${card.rating.number} <span class="text-warning">${card.rating.badge ? card.rating.badge : 'No Badge'}</span></small></h6>
        </div>
        <div class="row">
            <div class="col-12 col-md col-lg">
                <div class="row g-0 d-flex justify-content-start align-items-center">
                    <div class="col-3">
                        <img src="${card.author.img}" class="img-fluid p-2 rounded" alt="...">
                    </div>
                    <div class="col-9">
                        <div class="card-body">
                            <h6 class="card-title text-primary">${card.author.name ? card.author.name : 'Not Found'}</h6>
                            <p class="card-text"><small class="text-muted">${card.author.published_date}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col d-flex align-items-center">
                <div class="col d-flex justify-content-end">
                    <i class="fa-solid fa-eye px-2 text-danger"></i>
                    <h6 class="fw-bold m-0">${card.total_view ? card.total_view : 'No Rating'}</h6>
                </div>
            </div>
        </div>
    `;
}



loadedNews('01');
loadedNewsCategories();

// https://openapi.programming-hero.com/api/news/%7Bnews_id%7D
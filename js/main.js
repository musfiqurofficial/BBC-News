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
        console.log(category);
        const ulList = document.createElement('li');
        ulList.classList.add('nav-item');
        ulList.innerHTML = `
        <a class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
        `;
        categoriesList.appendChild(ulList);
    })
}
// All News categories

const loadedNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`
    const res = await fetch(url);
    const data = await res.json();
    cardList(data.data);
}

const cardList = cards => {
    const cardsId = document.getElementById('card-list');
    cards.forEach(card => {
        console.log(card);
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
                            <p class="card-text">${card.details.slice(0, 200)}...</p>
                            
                            <div>
                            <div class="row">
                            <div class="col d-flex justify-content-start align-items-center">
                                <div class="row g-0">
                                    <div class="col-3">
                                        <img src="/img/8123141.jpg" class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-9">
                                        <div class="card-body">
                                            <h5 class="card-title">hiiiiiii</h5>
                                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-center align-items-center">
                                <i class="fa-solid fa-eye px-2"></i>
                                <h6 class="m-0">1.4M</h6>
                            </div>
                            <div class="col d-flex justify-content-center align-items-center">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div class="col d-flex justify-content-end align-items-center">
                                <i class="fa-sharp fa-solid fa-arrow-right"></i>
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
}

loadedNews();
loadedNewsCategories();
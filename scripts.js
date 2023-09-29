const apiKey = process.env.NEWS_API_KEY;
let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const newsDiv = document.querySelector('#news');
const headlinesBtn = document.querySelector('#headlines');
const techBtn = document.querySelector('#tech');
const entBtn = document.querySelector('#ent');
const foodBtn = document.querySelector('#food');

headlinesBtn.addEventListener('click', () => {
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    removeArticles();
    fetchNews();
});

techBtn.addEventListener('click', () => {
    url = `https://newsapi.org/v2/everything?q=technology&apiKey=${apiKey}`;
    removeArticles();
    fetchNews();
});

entBtn.addEventListener('click', () => {
    url = `https://newsapi.org/v2/everything?q=entertainment&apiKey=${apiKey}`;
    removeArticles();
    fetchNews();
});

foodBtn.addEventListener('click', () => {
    url = `https://newsapi.org/v2/everything?q=food&apiKey=${apiKey}`;
    removeArticles();
    fetchNews();
});


async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('There was an error', error);
    }
}

function displayNews(articles) {
    for (let article of articles) {
        const articleCard = document.createElement('div');
        articleCard.className = 'card mb-4 h-100';
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        const col = document.createElement('div');
        col.className = 'col-4';
        const footer = document.createElement('div');
        footer.className = 'card-footer';
        const publishedDate = document.createElement('small');
        publishedDate.className = 'text-body-secondary';
        let month = article.publishedAt.slice(5, 7);
        let day = article.publishedAt.slice(8, 10);
        let year = article.publishedAt.slice(0, 4);
        publishedDate.textContent = `Published on ${month}/${day}/${year}`;
        // const img = document.createElement('img');
        // img.className = 'card-img-top';
        // img.src = article.urlToImage;
        // img.alt = 'article image';
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = article.title;
        const description = document.createElement('p');
        description.className = 'card-text';
        description.innerHTML = article.description;
        const author = document.createElement('footer');
        author.className = 'card-subtitle mb-2 text-body-secondary';
        if (!article.author) {
            author.textContent = 'Unattributed';
        } else {
            author.textContent = article.author;
        }
        const link = document.createElement('a');
        link.className = 'btn stretched-link';
        link.textContent = 'Read More';
        link.href = article.url;
        cardBody.appendChild(title);
        cardBody.appendChild(author);
        cardBody.appendChild(description);
        cardBody.appendChild(link);
        // articleCard.appendChild(img);
        articleCard.appendChild(cardBody);
        footer.appendChild(publishedDate);
        articleCard.appendChild(footer);
        col.appendChild(articleCard);

        newsDiv.appendChild(col);
    }
}

function removeArticles() {
    while (newsDiv.firstChild) {
        newsDiv.removeChild(newsDiv.firstChild);
    }
}

fetchNews();

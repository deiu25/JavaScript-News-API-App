const categoryLabel = document.getElementById("category-label");
const listNews = document.getElementById("list");
const select = document.getElementById("selectNews");

const categories = [
  "all",
  "business",
  "sports",
  "world",
  "politics",
  "technology",
  "startup",
  "entertainment",
  "miscellaneous",
  "hatke",
  "science",
  "automobile",
];

class News {
  constructor(
    author,
    content,
    date,
    id,
    imageUrl,
    readMoreUrl,
    time,
    title,
    url
  ) {
    this.author = author;
    this.content = content;
    this.date = date;
    this.id = id;
    this.imageUrl = imageUrl;
    this.readMoreUrl = readMoreUrl;
    this.time = time;
    this.title = title;
    this.url = url;
  }

  renderNews = () => {
    const li = document.createElement("li");
    li.className = "listItem";

    li.innerHTML = `
      <img src=${this.imageUrl} alt=${this.title} class="image" />
      <div>
        <span>Title: ${this.title}</span>
        <a target="_blank" href=${this.url}>Read More...</a>
      </div>
    `;

    return li;
  };
}

const updateCategoryLabel = (category) => {
  categoryLabel.innerText = `Category: ${category}`;
};

const createNews = (newsArray) => {
  const news = newsArray.map((newsValue) => {
    return new News(
      newsValue.author,
      newsValue.content,
      newsValue.date,
      newsValue.id,
      newsValue.imageUrl,
      newsValue.readMoreUrl,
      newsValue.time,
      newsValue.title,
      newsValue.url
    );
  });

  return news;
};

const getNewsInfo = async (category) => {
  const response = await fetch(
    `https://inshorts.deta.dev/news?category=${category}`
  );
  const data = await response.json();

  return data;
};

const loadNews = async () => {
  //
  // select.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    let opt = categories[i];
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
  let x = document.getElementById("selectNews").value;
  //
  const newsInfo = await getNewsInfo(x);

  const { category, data: newsArray } = newsInfo;

  updateCategoryLabel(category);
  const news = createNews(newsArray);

  news.forEach((newsValue) => {
    const newLiElement = newsValue.renderNews();
    listNews.append(newLiElement);
  });
};

loadNews();

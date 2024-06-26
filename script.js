const API_KEY = "671a363ca8a4467f889fdca970dfb7c7";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => fetchNews("India"));
function reload(){
    window.location.reload();

}
async function fetchNews(query){
   const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json(); // Corrected

   bindData(data.articles);
}
function bindData(articles){
    const cardscontainer = document.getElementById("maincont");
    const newscardtemplate = document.getElementById("templatenews");

    cardscontainer.innerHTML ="";

    articles.forEach((article) => { // Corrected
        if(!article.urlToImage) return;
        const cardclone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardclone,article);
        cardscontainer.appendChild(cardclone);
    });
}
function fillDataInCard(cardclone,article){
    const  newsimg = cardclone.querySelector('#newsimg'); // Corrected
    const  newstitle = cardclone.querySelector('#newstitle'); // Corrected
    const  newssource = cardclone.querySelector('#newssource'); // Corrected
    const  newsdes = cardclone.querySelector('#newsdes'); // Corrected

   newsimg.src = article.urlToImage;
   newstitle.innerHTML = article.title;
   newsdes.innerHTML = article.description;

   const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta"});
   newssource.innerHTML = `${article.source.name} . ${date}`;
   cardclone.firstElementChild.addEventListener("click" , () => {window.open(article.url,"_blank");});
}
let curselectednav = null;
function onnavitemclick(id){
    fetchNews(id);
    const navitem = document.getElementById(id);
    curselectednav?.classList.remove('active');
    curselectednav = navitem;
    curselectednav.classList.add('active');
}
const searchbutton = document.getElementById('searchbutton');
const searchtext = document.getElementById('searchresult');
searchbutton.addEventListener("click", () =>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curselectednav?.classList.remove('active');
    curselectednav = null;

});



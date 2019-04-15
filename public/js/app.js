document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const col = db.collection('articles');
    var my_func = function(event) {
        event.preventDefault();
        col.doc().set({
            Author_name: $('#authorName').val(),
            Article_Title: $('#articleTitle').val(),
            Article_body: $('#articleBody').val()
        })
        .then(function() {
            console.log("Document successfully written!");
            str = `<div class="card text-white bg-dark article">
            <div class="card-header text-center">`+ $('#authorName').val() +`
            </div>
            <div class="card-body">
            <blockquote class="blockquote">
            <p class="card-text">`+ $('#articleBody').val() +`</p>
            <footer class="blockquote-footer">`+ $('#authorName').val() +`</footer>
            </blockquote></div></div>`
            document.getElementById('ArticleContainer').innerHTML += str;
            $('#authorName').val('');
            $('#articleTitle').val('');
            $('#articleBody').val('');
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    
    };
    var form = document.getElementById("ArticleForm");
    form.addEventListener("submit", my_func, true);
    col.get().then(articles => {
        articles.forEach(art =>{
            data = art.data()
            str = `<div class="card text-white bg-dark article">
            <div class="card-header text-center"> ${data.Article_Title}
            </div>
            <div class="card-body">
            <blockquote class="blockquote">
            <p class="card-text"> ${data.Article_body} </p>
            <footer class="blockquote-footer"> ${data.Author_name} </footer>
            </blockquote></div></div>`
            document.getElementById('ArticleContainer').innerHTML += str;
        });
    });
});




$(document).ready(function (event) {
    $(".art-save-btn").click(function(){
        let article = {
            title: $(this).siblings(".art-title").text(),
            link: $(this).siblings().find(".art-link").attr('href'),
            image: $(this).siblings().find(".carousel-image").attr("src"),
        }
        saveArticle(article);
        location.reload();
    })

    $(".add-comment").click(function () {
        let articleId = $(this).attr('value');
        $(`.${articleId}`).show();

    });

    $(".save-comment").click(function () {
        let id = $(this).val();
        let data = {
            title: $(`.ct-${id}`).val(),
            body: $(`.cb-${id}`).val(),
        }
        saveComment(id, data);
    })

    $(".del_rec").click(function(){
        let commentId = $(this).attr('value');
        let articleId = $(`.${commentId}`).parents().eq(2).attr('class');
        delComment(commentId, articleId);
        $(`#cb-${commentId}`).remove();
    })

    $(".del_art").click(function(){
        let artId = $(this).attr('value');
        delArticle(artId);
        location.reload();
    })

    $('#controlR').click(function() {
        $('#content').animate({
          marginLeft: "-=400px"
        }, "fast");
     });
    
    $('#controlL').click(function() {
        $('#content').animate({
          marginLeft: "+=400px"
        }, "fast");
    });
});



var saveArticle = function(article){
    $.ajax({
        method: "POST",
        url: '/save-article',
        data: article
    }).then(function (data) {
        console.log(data);
    }).catch(err => {
        console.log(err)
    });
}

var delArticle = function(id){
    $.ajax({
        method: "DELETE",
        url: `/del_art/${id}`
    }).then(function (deleted) {
        console.log(deleted)
    }).catch((err) => {
        console.log(err);
    });
}

var saveComment = function (id, data) {
    $.ajax({
        method: "POST",
        url: `/article/${id}`,
        data: {
            title: data.title,
            body: data.body,
        }
    }).then(function (data) {
        console.log(data);

    }).catch(err => {
        console.log(err)
    });
};

var delComment = function (commentId, articleId) {
    $.ajax({
        method: "DELETE",
        url: `/del_com/${commentId}`,
        data: {'articleId': articleId}
    }).then(function (deleted) {
        console.log(deleted)
    }).catch((err) => {
        console.log(err);
    });
};


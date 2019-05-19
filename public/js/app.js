


$(document).ready(function (event) {

    $(".add-comment").on("click", function () {
        let articleId = $(this).val();
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
        let commentId = $(this).val();
        let articleId = $(`.${commentId}`).parents().eq(1).attr('class');
        del(commentId, articleId);
    })

    $('#controlR').click(function() {
        // event.preventDefault();
        $('#content').animate({
          marginLeft: "-=400px"
        }, "fast");
     });
    
    $('#controlL').click(function() {
        // event.preventDefault();
        $('#content').animate({
          marginLeft: "+=400px"
        }, "fast");
    });
});


var saveComment = function (id, data) {
    $.ajax({
        method: "POST",
        url: `/article/${id}`,
        data: {
            title: data.title,
            body: data.body,
        }
    }).then(function (data) {
        //update front end???
        // add as top child div to article identified by id
        console.log(data);

    }).catch(err => {
        console.log(err)
    });
};

var del = function (commentId, articleId) {
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


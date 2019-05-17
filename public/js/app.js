


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
        let id = $(this).val();
        del(id);
    })
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

var del = function (id) {
    $.ajax({
        method: "DELETE",
        url: `/delete/${id}`,
    }).then(function (deleted) {
        console.log(deleted)
    })
}
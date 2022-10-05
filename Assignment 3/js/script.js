$(document).ready(function () {
    ajaxcall();
});
function jsoncall() {
    $.getJSON("team.json", function (result) {
        $.each(result, function (i, val) {
            $("#team").append("<h2>" + val.name + "</h2><h5>" + val.position + "</h5><p>" + val.bio + "</p>");
        });
    });
}
function ajaxcall() {
    $.ajax({
        type: "Get",
        url: "team.json",
        dataType: "json",
        beforeSend: function () {
            $("#team").html("<h3>Loading...</h3>");
        },
        success: function (data) {
            setTimeout(function () {
                $("#team").html("");
                var dataTab = $.parseJSON(JSON.stringify(data));
                $.each(dataTab, function (index, value) {
                    $("#team").append('<h2>' + value.name + '</h2><h5>' + value.position + '</h5><p>' + value.bio + '</p>');
                });
            }, 3000);
        },
        error: function () {
            $("#team").html("The content could not be retrieved");
        }
    });
}
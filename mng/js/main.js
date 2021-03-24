$(function() {
    $(document).ready(function() {
        if ($("#alert").length == 1) {
            $("#alert").toggle("fold", { size: 2 }, 800);
        }
    });
});

$(function() {
    $(".dropdown").click(function() {
        var dropdown = $(this).find(".dropdown-items");
        if (dropdown.hasClass("show")) {
            dropdown.removeClass("show");
        } else {
            $(".dropdown-items.show").removeClass("show");
            dropdown.addClass("show");
        }
    });
});
$(function() {
    function previewImage(input, previewId) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $(previewId).css('background-image', 'url(' + e.target.result + ')');
                $(previewId).hide();
                $(previewId).fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".previewImage").change(function() {
        previewImage(this, "#imagePreview");
    });
})

$(function() {
    $("#slider-range").slider({
        range: true,
        min: 130,
        max: 500,
        values: [0, 250],
        slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));
});
$(function() {
    $(".open-search-filter").click(function() {
        $('.other-filters ').toggle('slow');
    })
});
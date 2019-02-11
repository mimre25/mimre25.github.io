var currentImg = 0;
var screenWidth = -1;

var images = [];
function preload() {
    let width = screenWidth * 0.5;
    for (var i = 0; i < 26; i++) {
        images[i] = new Image(width, width/1.2);
        images[i].id = "photo";
        images[i].src = "img/" + i + ".jpg";
    }
}

function change(newImg)
{
    $("#photo").fadeOut(function () {
        // $(this).attr('src', "img/" + newImg + '.jpg');
        $(this).replaceWith(images[currentImg]);
        $(this).fadeIn();

        if(newImg === 0)
        {
            $("#text").show();
        } else
        {
            $("#text").hide();
        }

    });


}

function incr()
{
    if (currentImg < 25)
    {
        ++currentImg;
    }
}

function decr()
{
    if (currentImg > 0)
    {
        --currentImg;
    }
}

function main()
{
    screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    preload();
    $("#photo").attr('src', images[0].src).hide().fadeIn();
    $(document).keydown(function (event) {
        if (event.which === 37) //left
        {
            decr();
        }
        if (event.which === 39)//right
        {
            incr();
        }
        change(currentImg);
    });

    jQuery( window ).on( "swipe",
        function( event ) {
        let start = event.swipestart.coords;
        let end = event.swipestop.coords;

        let dis = end[0] - start[0];
        if (dis > 0)
        {
            decr();
        } else
        {
            incr();
        }
        change(currentImg);
    } );


}




window.onload = main;
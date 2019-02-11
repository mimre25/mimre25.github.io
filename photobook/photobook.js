var currentImg = 0;



function change(newImg)
{
    $("#photo").fadeOut(function () {
        $(this).attr('src', "img/" + newImg + '.jpg');
        $(this).fadeIn();

    });

    if(newImg === 0)
    {
        $("#text").show()
    } else
    {
        $("#text").hide();
    }

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
    $("#photo").attr('src', "img/" + currentImg + '.jpg').hide().fadeIn();
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
        if (dis < 0)
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
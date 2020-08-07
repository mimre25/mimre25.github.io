OLD_TOP_LEFT = {x: 110, y: 240}
OLD_BOT_LEFT = {x: 90, y: 510}
OLD_RIGHT = {x: 230, y: 375}

NEW_LEFT = {x: 450, y: 140}
NEW_TOP_RIGHT = {x: 550, y: 330}
NEW_BOT_RIGHT = {x: 570, y: 510}

OUTDOOR = {x: 420, y: 490}

RESET_CYCLE_DAYS = 49;


OLD_TOP_LEFT_REFERENCE = new Date("2020-06-08");
OLD_BOT_LEFT_REFERENCE = new Date("2020-07-06");
OLD_RIGHT_REFERENCE = new Date("2020-06-22");
NEW_LEFT_REFERENCE = new Date("2020-06-15");
NEW_TOP_RIGHT_REFERENCE = new Date("2020-06-29");
NEW_BOT_RIGHT_REFERENCE = new Date("2020-07-13");
OUTDOOR_REFERENCE = new Date("2020-07-20");


RED = "#EF1717"
YELLOW = "#F9E111"
GREEN = "#2EEF17"
WHITE = "#F5F1F1"

function dateToString(date) {
	let mm = date.getMonth() + 1; // getMonth() is zero-based
 	let dd = date.getDate();
	return dd+"."+mm;
}

function nextReset(date) {
	let today = new Date();
	let diff = parseInt((today - date) / (1000 * 60 * 60 * 24), 10); 
	let diffInCycle = diff % RESET_CYCLE_DAYS;
	let daysLeft = RESET_CYCLE_DAYS - diffInCycle;

	return new Date(today.setDate(today.getDate() + daysLeft))
}

function drawTextBG(ctx, txt, font, x, y, color) {

    /// lets save current state as we make a lot of changes        
    ctx.save();

    /// set font
    ctx.font = font;

    /// draw text from top - makes life easier at the moment
    ctx.textBaseline = 'top';

    /// color for background
    ctx.fillStyle = color;
    
    /// get width of text
    var width = ctx.measureText(txt).width;

    /// draw background rect assuming height of font
    ctx.fillRect(x, y-5, width, parseInt(font, 10));
    
    /// text color
    ctx.fillStyle = '#000';

    /// draw text on top
    ctx.fillText(txt, x, y);
    
    /// restore original state
    ctx.restore();
}


function main()
{

	let canvas = document.getElementById("main");
	let ctx = canvas.getContext("2d");

	// canvas.width = 903;
	// canvas.height = 657;

	let old_top_left = nextReset(OLD_TOP_LEFT_REFERENCE);
	let old_bot_left = nextReset(OLD_BOT_LEFT_REFERENCE);
	let old_right = nextReset(OLD_RIGHT_REFERENCE);
	let new_left = nextReset(NEW_LEFT_REFERENCE);
	let new_top_right = nextReset(NEW_TOP_RIGHT_REFERENCE);
	let new_bot_right = nextReset(NEW_BOT_RIGHT_REFERENCE);
	let outdoor = nextReset(OUTDOOR_REFERENCE);

	let allDates = [old_top_left, old_bot_left, old_right, new_left, new_top_right, new_bot_right, outdoor].sort()
	let next = allDates[0]
	let next_next = allDates[1]
	let next_next_next = allDates[2]
	console.log(next, next_next, next_next_next);

	colorForPosition = function(date)
	{
		if (date == next) 
		{
			return RED
		}
		if (date == next_next)
		{
			return YELLOW
		}
		if (date == next_next_next)
		{
			return GREEN
		}
		return WHITE
	}

	var background = new Image();
	background.src = "plan.jpg";

	// Make sure the image is loaded first otherwise nothing will draw.
	background.onload = function()
	{

		ctx.drawImage(background,0,0, canvas.width, canvas.height);   
		let font = "48px Arial";
		// drawTextBG(ctx, txt, font, x, y, color)
		drawTextBG(ctx, dateToString(old_top_left), font, OLD_TOP_LEFT.x, OLD_TOP_LEFT.y, colorForPosition(old_top_left));
		drawTextBG(ctx, dateToString(old_bot_left), font, OLD_BOT_LEFT.x, OLD_BOT_LEFT.y, colorForPosition(old_bot_left));
		drawTextBG(ctx, dateToString(old_right), font, OLD_RIGHT.x, OLD_RIGHT.y, colorForPosition(old_right));
		drawTextBG(ctx, dateToString(new_left), font, NEW_LEFT.x, NEW_LEFT.y, colorForPosition(new_left));
		drawTextBG(ctx, dateToString(new_top_right), font, NEW_TOP_RIGHT.x, NEW_TOP_RIGHT.y, colorForPosition(new_top_right));
		drawTextBG(ctx, dateToString(new_bot_right), font, NEW_BOT_RIGHT.x, NEW_BOT_RIGHT.y, colorForPosition(new_bot_right));
		drawTextBG(ctx, dateToString(outdoor), font, OUTDOOR.x, OUTDOOR.y, colorForPosition(outdoor));
	}
	


}










window.onload = main;

function helpPage(id){


var content = `

<div id="masterHelpDiv">

<div class="wholeCard">
    <div class="cardInner">
        <div class="cardFront">
            <h1>How to Search for a stock?</h1>
        </div>
        <div class="cardBack">
        <p>
            The way to search for a stock is to click on the magnifying glass in the navigation bar. This will take you
            to another page with a search box. In the search box, search a stock that you would like to know the prediction for
            and click the search button. The graph and information about the stock will display.
        </p>
        </div>
    </div>
</div>

<div class="wholeCard">
    <div class="cardInner">
        <div class="cardFront">
            <h1>How to see what's trending?</h1>
        </div>
        <div class="cardBack">
        <p>
            The way to find the stocks that are trending is to click on the graph icon in the navigation bar. This will give a list of
            some blue chip stocks that trending for the day. Once you click on a stock from the list, you will be navigated to a page that
            displays a graph with the predicted stock price and some information about the company.
        </p>
        </div>
    </div>
</div>

<div class="wholeCard">
    <div class="cardInner">
        <div class="cardFront">
            <h1>How to view your profile?</h1>
        </div>
        <div class="cardBack">
        <p>
            To view your profile click on the profile icon in the navigation bar. The profile page will display all the stocks that you have
            invested virtual money in, the amount of money you have, the amount of profit that you have made for the day, your profile picture,
            and basic profile information, including email, username, etc.
        </p>
        </div>
    </div>
</div>

<div class="wholeCard">
    <div class="cardInner">
        <div class="cardFront">
            <h1>How to read the graph?</h1>
        </div>
        <div class="cardBack">
        <p>
            The graph displays a trend with two different colored lines. The green line is how the stock has been trending in the past, based on
            that data a red line continues the trend and shows the predicted movement. Also, it shows the confidence with which the application
            believes the prediction to be correct.
        </p>
        </div>
    </div>
</div>

</div>

    <div id="foot2">
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    </div>

 `;

        document.getElementById(id).innerHTML = content;
}
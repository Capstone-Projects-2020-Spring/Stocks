function home(id) {
    
    var content = `

    <div id="homeContent">
    <h1 id="homeHeader1">Welcome to TIKR!</h1>
    
    <div id="homeDescription">
        Always losing money in the markets? Well you have you have come the right place. With TIKR you will able to get insight into the
        future movements of stocks in the market. With an astonishing overall 68% accuracy rate for next day predictions, this application will allow 
        you to get an idea of where the market is headed and if you should sell or hold your positions. Don't take it from us, try if for 
        yourself.
    </div>
    </div>
     <div id="foot">
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    </div>
<!--<div id="homeIntro">
    Thank you for visiting TIKR. If you would like to make money from investing then you have come to the right
    <br>place. This web application allows for the prediction of movements in prices for blue chips stocks.
</div>
    -->
    `;
    
    document.getElementById(id).innerHTML = content;
        }
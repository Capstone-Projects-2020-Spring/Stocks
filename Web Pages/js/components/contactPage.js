function contactPage(id){
    auth.onAuthStateChanged(user => {
        if(user){
            var content = `
    
    <div id="contactForm">
    <h1 style="text-align: center">Contact Us!</h1>
    <div id="contactParagraph">

    Most of the answers to your questions can be found in the FAQs section of this page. However, if that is not the case then we are here to
    assist you with any other questions. Send us an email at example@temple.edu and we will get back to you as soon as possible. Make sure to
    put the question in the subject line and give a brief description of the problem that troubles you. One of our support team members will
    respond to the email as soon as they can. We thank you for your patience.

    </div>
    
        <form id="contactFormContent">
            <label for="question">Question</label><br>
            <input type="text" name="question" id="contactQuestion"><br>
            <button class="buttons" id="regButton">Send</button>
        </form>
    </div>
    
    <div id="foot">
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>
    </div>
    
    
    
    `;
            const userEmail = firebase.auth().currentUser.email;
            document.getElementById(id).innerHTML = content;
            const contactMessage = document.querySelector('#contactFormContent');
            contactMessage.addEventListener('submit', (e) =>{
                //prevents page from refreshing when info is submitted
                e.preventDefault();
                const question = contactMessage['contactQuestion'].value;

                const newMessage = database.ref('messages').push();
                newMessage.set({
                    question : question,
                    email: userEmail
                });

                // var content = `
                // <div id="contactForm">
                // <div id="contactParagraph">
                //
                // <h1>Your Question has been sent to a member of the TIKR team, please allow 48 hours for response. Thank you</h1>
                //
                // </div>
                // </div>
                // `;
                const questionSent = document.getElementById('contactParagraph').innerHTML="Your Question has been sent to a member of the TIKR team, please allow 48 hours for a response. Thank you";
                contactMessage.reset();



            });

        } else{
            var content = `
    <div id="contactForm">
    <div id="contactParagraph">

    <h1>Please Login in order to ask a question.</h1>

    </div>
    </div> 
    `;
            document.getElementById(id).innerHTML = content;
        }
    })


    /*var content = `
    
    <div id="contactForm">
    <h1 style="text-align: center">Contact Us!</h1>
    <div id="contactParagraph">

    Most of the answers to your questions can be found in the FAQs section of this page. However, if that is not the case then we are here to
    assist you with any other questions. Send us an email at example@temple.edu and we will get back to you as soon as possible. Make sure to
    put the question in the subject line and give a brief description of the problem that troubles you. One of our support team members will
    respond to the email as soon as they can. We thank you for your patience.

    </div>
    
        <form id="contactFormContent">
            <label for="email">Email</label><br>
            <input type="text" name="email" id="contactEmail"><br>
            <label for="question">Question</label><br>
            <input type="text" name="question" id="contactQuestion"><br>
            <button class="buttons" id="regButton">Send</button>
        </form>
    </div>
    
    
    
    `;*/
}
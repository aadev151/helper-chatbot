// Main chat area
const content = document.getElementById('content');

// Building general placeholder for text answers
var placeholderMessage = document.createElement('div');
placeholderMessage.classList.add('message');

var placeholderLine1 = document.createElement('div');
placeholderLine1.classList.add('responsePlaceholder');
placeholderLine1.classList.add('responsePlaceholder-12');

var placeholderLine2 = document.createElement('div');
placeholderLine2.classList.add('responsePlaceholder');
placeholderLine2.classList.add('responsePlaceholder-12');

var placeholderLine3 = document.createElement('div');
placeholderLine3.classList.add('responsePlaceholder');
placeholderLine3.classList.add('responsePlaceholder-8');

placeholderMessage.appendChild(placeholderLine1);
placeholderMessage.appendChild(placeholderLine2);
placeholderMessage.appendChild(placeholderLine3);


/**
 * 
 * @param {*} placeholder placeholder to try and delete. Currently
 * makes sense just for weather but will be useful for scaling and adding new widgets.
 */
function sendErrorMessage(placeholder=null) {
    var message = document.createElement('div');
    message.classList.add('message');
    message.classList.add('fromBot');
    message.innerHTML = 'Error. Please try again later.';

    try {
        content.removeChild(placeholderMessage);
    } catch(e) {}
    try {
        content.removeChild(placeholder);
    } catch(e) {}
    
    content.appendChild(message);
    content.scrollTo(0, content.scrollHeight);
}

const promptForm = document.getElementById('promptForm');
const prompt = document.getElementById('prompt');


/**
 * Answering general questions (Gemini responses)
 */
promptForm.addEventListener('submit', function(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    if (!window.navigator.onLine) {
        // Checking connection on the client side because if the program runs locally,
        // it is still possible to ping the server. However, the Gemini API will run
        // forever and not send any type of timeout.
        // Not always helpful because of false positives (https://stackoverflow.com/a/53820206), 
        // but it is better to check than not to.
        // Network / timeout errors are handled by the server in other cases. Here, the
        // client intervention is necessary.

        sendErrorMessage();
        return;
    }

    const promptValue = prompt.value;
    prompt.value = '';

    var toBotMessage = document.createElement('div');
    toBotMessage.classList.add('message');
    toBotMessage.classList.add('toBot');
    toBotMessage.innerHTML = promptValue;
    content.appendChild(toBotMessage);

    content.appendChild(placeholderMessage);
    content.scrollTo(0, content.scrollHeight);

    fetch('/api/sendprompt', {
        method: 'POST',
        body: JSON.stringify({
            prompt: promptValue
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.status === 'OK') {
            content.removeChild(placeholderMessage);

            var fromBotMessage = document.createElement('div');
            fromBotMessage.classList.add('message');
            fromBotMessage.classList.add('fromBot');
            fromBotMessage.innerHTML = json.response;
            content.appendChild(fromBotMessage);

        } else {
            sendErrorMessage();
        }
    })
    .catch((error) => sendErrorMessage());

    return false;
});
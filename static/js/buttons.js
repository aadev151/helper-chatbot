const weather = document.getElementById('weather');
const food = document.getElementById('food');
const qr = document.getElementById('qr');
const quote = document.getElementById('quote');

/**
 * Sends a placeholder for the weather widget in the chat
 * @returns the placeholder for us to be able to delete it after we get a response
 */
function addWeatherPlaceholder() {
    var placeholder = document.createElement('div');
    placeholder.classList.add('responsePlaceholder');
    placeholder.classList.add('responsePlaceholder-Weather');
    content.appendChild(placeholder);
    content.scrollTo(0, content.scrollHeight);

    return placeholder;
}

/**
 * Removes the placeholder for weather and inserts the actual weather widget
 * @param {*} json JSON data from the weather API service
 * @param {*} placeholder placeholder to remove
 */
function removeWeatherPlaceholderAndAddInfo(json, placeholder) {
    content.removeChild(placeholder);

    var weather = document.createElement('div');
    weather.classList.add('message');
    weather.classList.add('fromBot');
    weather.classList.add('weather');

    var weatherIcon = document.createElement('img');
    weatherIcon.classList.add('weather-icon');
    weatherIcon.src = json.current.condition.icon;

    var weatherCity = document.createElement('h1');
    weatherCity.classList.add('weather-city');
    weatherCity.innerHTML = json.location.name;

    var weatherTemp = document.createElement('h2');
    weatherTemp.classList.add('weather-temp');
    weatherTemp.innerHTML = `${json.current.temp_c}°C / ${json.current.temp_f}°F`;

    weather.appendChild(weatherIcon);
    weather.appendChild(weatherCity);
    weather.appendChild(weatherTemp);

    content.appendChild(weather);
    content.scrollTo(0, content.scrollHeight);
}


weather.addEventListener('click', function() {
    var placeholder = addWeatherPlaceholder();

    // First, get the IP address and show the weather for
    // the user's "current" (approximately) location
    fetch('https://ipinfo.io/json')
        .then((response) => response.json())
        .then((json) => {
            var city = json.city;

            // If that suceeds, send request to the server that
            // stores the API key and is able to get the weather info
            fetch('/api/weather', {
                method: 'POST',
                body: JSON.stringify({
                    city: city
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 'OK') {
                    removeWeatherPlaceholderAndAddInfo(json.response, placeholder);

                } else {
                    sendErrorMessage(placeholder);
                }
            })
            .catch((error) => sendErrorMessage(placeholder));
        })
        .catch((error) => sendErrorMessage(placeholder));
});


/**
 * Redirect to the DoorDash website upon clicking the 'Food'button
 */
food.addEventListener('click', function() {
    var message = document.createElement('div');
    message.classList.add('message');
    message.classList.add('fromBot');
    message.innerHTML = 'Redirecting you to <a class="doordash" href="https://doordash.com/" target="_blank">DoorDash</a>';
    
    content.appendChild(message);
    content.scrollTo(0, content.scrollHeight);
    
    window.open('https://doordash.com', '_blank').focus();
});


/**
 * Callback for submitting the textfield going along the initial QR code response
 * ('What is the website's URL?')
 * Sending the image and the Save button for the image
 * @param {*} e 
 */
function submitQrForm(e) {
    // Cancel submitting the form to cancel refreshing the page
    if (e.preventDefault) {
        e.preventDefault();
    }

    var url = e.currentTarget.inputField.value;   // Getting value from the input sent in the
                                                  // previous message (see line 156)

    if (!url || url == '') {
        return;   // only proceed with a non-empty input
    }

    var qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + url;

    var message = document.createElement('div');
    message.classList.add('message');

    var qrCode = document.createElement('img');
    qrCode.src = qrCodeUrl;

    message.appendChild(qrCode);

    var message2 = document.createElement('div');
    message2.classList.add('message');

    var saveBtn = document.createElement('a');
    saveBtn.classList.add('button');
    saveBtn.href = qrCodeUrl;
    saveBtn.download = true;
    saveBtn.innerText = 'Save';

    message2.appendChild(saveBtn);

    content.appendChild(message);
    content.appendChild(message2);
    content.scrollTo(0, content.scrollHeight);
}


/**
 * Sending the initial QR code response -- a form with a text field requiring
 * the URL for the website 
 */
function addQrMessage() {
    var message = document.createElement('div');
    message.classList.add('message');
    message.classList.add('fromBot');

    var text = document.createElement('p');
    text.innerHTML = 'What is the website\'s URL?';

    var form = document.createElement('form');
    form.addEventListener('submit', submitQrForm);

    var inputWrap = document.createElement('div');
    inputWrap.classList.add('inputWrap');

    var input = document.createElement('input');
    inputWrap.appendChild(input);

    form.appendChild(inputWrap);
    form.inputField = input;   // Passing the input as a parameter to the form handler

    message.appendChild(text);
    message.appendChild(form);
    
    content.appendChild(message);
    content.scrollTo(0, content.scrollHeight);
}


qr.addEventListener('click', function() {
    addQrMessage();
});


/**
 * Sednind a random programming-related quote in the chat
 */
function addQuoteMessage() {
    content.appendChild(placeholderMessage);
    content.scrollTo(0, content.scrollHeight);

    fetch('https://programming-quotesapi.vercel.app/api/random')
        .then((response) => response.json())
        .then((json) => {
            var message = document.createElement('div');
            message.classList.add('message');
            message.classList.add('fromBot');

            message.innerHTML = `"${json.quote}" - ${json.author}`;

            content.removeChild(placeholderMessage);
            content.appendChild(message);
            content.scrollTo(0, content.scrollHeight);
        })
        .catch((error) => sendErrorMessage());
}


quote.addEventListener('click', function() {
    addQuoteMessage();
});
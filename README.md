# Helper Chatbot

This project was created as a Kata assessment for the interview process at Direct Supply.

This is a web-based chatbot, written using JavaScript, Python, HTML, and CSS. It is capable of:
1. Talking to users. The "brains" behind the bot is Gemini.
2. Displaying weather for user's current location
3. Ordering food (just redirect to DoorDash)
4. Creating a QR-code to any webpage or any data entry
5. Posting a random programming-related quote

The program implements safe fail and was tested with:
- regular conditions
- corrupted data sent from the server
- absence of network

In most cases, the chatbot notifies the user about a back-end problem, but it sometimes struggles to do it with Gemini's response. Google's API does not have any timeout, so it can run forever if the server is run locally and without a network connection. Even though I check user's connectivity through JavaScript on the client's side, it does not prevent the bot from trying to get a response from Gemini, probably because of false positives (https://stackoverflow.com/a/53820206)

A limited demo (because of PythonAnywhere's restrictions, only Food, QR code, and Quote are available) are available via this link: https://alexkata.pythonanywhere.com/

Thank you for your time and consideration!

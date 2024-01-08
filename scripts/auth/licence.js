// testing expired - 1700000000000
// testing in date - 2000000000000

// DateTime for Licence Expiry
const _EXPIRY = new Date(2000000000000);

// Alert for out of date Licence
const _LICENCE_ALERT = `
<u><h1>Trial Over</h1></u>
<p>This test version has expired, deadline : ${_EXPIRY.toDateString()}</p>`;

// Payload for valid Licence
const _TEST_ACESS_PAYLOAD= `<form id="authenticateForm" onsubmit="acess_test(event)">
<label for="accessInput">Enter Access Key:</label>
<input type="password" id="accessInput" placeholder="Required..." required>
<input type="submit" value="Submit"></form>
<div id = "quizArea"></div>`;

if (Date.now() - _EXPIRY > 0) {
    // Licence Expired -> Alert
    const alert = document.createElement("div", innerHTML = _LICENCE_ALERT);
    document.body.appendChild(alert);
} else {
    // License Valid -> Form for test acess
    document.body.innerHTML = _TEST_ACESS_PAYLOAD;
}

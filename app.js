const regexUrl = /https:\/\/([^\/]+)\/app\/explorer\.html#instance\?uuid=([a-zA-Z0-9-]+)/;

window.onload = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const button = document.getElementById('openUrl');
        const message = document.getElementById('msg');

        const currentUrl = tabs[0].url;
        const isValidUrl = checkInstanceUrl(currentUrl);

        if (isValidUrl) {
            changeColorIcon('green');
            button.style.display = 'block';
            message.style.display = 'none';
        } else {
            changeColorIcon('gray');
            button.style.display = 'none';
            message.style.display = 'block';
        }
    });
};

document.getElementById("openUrl").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentUrl = tabs[0].url;
        const isValidUrl = checkInstanceUrl(currentUrl);

        if (isValidUrl) {
            let imageUrl = currentUrl.replace('app/explorer.html#instance?uuid=', 'instances/');
            imageUrl += '/preview';
            chrome.tabs.create({ url: imageUrl });
        } else {
            alert('Debe encontrarse dentro de una instancia en ORTHANC');
        }
    });
});

//Check if ORTHANC current URL is in "instace"
const checkInstanceUrl = (url) => {
    const checkUrl = url.match(regexUrl);
    if (!checkUrl)
        return false;

    return true;
}

const changeColorIcon = (color = 'gray') => {
    chrome.action.setIcon({
        path: {
            48: `assets/icon-${color}-48x48.png`,
        }
    });
}
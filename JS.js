let btnXHR = document.getElementById('xhrSearch');
let btnFetch = document.getElementById('fetchSearch');
let btnFetchAsyncAwait = document.getElementById('fetchAsyncAwaitSearch');

let searchText = document.querySelector('header input[type="text"]');
let searchResults = document.getElementById("searchResults");


btnXHR.addEventListener("click", function () {
    // clear previous search results
    searchResults.innerHTML = "";
    fetchGiphyAPI_UsingXHR(searchText.value);
});

btnFetch.addEventListener("click", function () {
    // clear previous search results
    searchResults.innerHTML = "";
    fetchGiphyAPI_UsingFetch(searchText.value);
});

btnFetchAsyncAwait.addEventListener("click", function () {
    // clear previous search results
    searchResults.innerHTML = "";
    fetchGiphyAPI_UsingFetchAsyncAwait(searchText.value)
        .catch((e) => {
            console.error(e);
        });
});

function fetchGiphyAPI_UsingFetch(keyword) {
    if (!keyword) {
        return;
    }
    var url = "https://api.giphy.com/v1/gifs/search";
    var apiKey = "GF3CGzMtVpa0xs6vZPLQjB4Bmp6hJLvD";
    var params = "api_key=" + apiKey + "&limit=5&q=" + encodeURIComponent(keyword);
    var requestOptions = {
        method: 'GET'
    };
    fetch(url + "?" + params, requestOptions)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            processResponse(JSON.parse(data))
        })
        .catch((e) => {
            console.error(e);
        })
}



function fetchGiphyAPI_UsingXHR(keyword) {
    if (!keyword) {
        return;
    }
    var url = "https://api.giphy.com/v1/gifs/search";
    var apiKey = "GF3CGzMtVpa0xs6vZPLQjB4Bmp6hJLvD";
    var params = "api_key=" + apiKey + "&limit=5&q=" + encodeURIComponent(keyword);
    var xhr = new XMLHttpRequest();
    // console.log(this); this->document
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            processResponse(JSON.parse(this.responseText));
        }
    });

    xhr.open("GET", url + "?" + params);
    xhr.send();
}


function processResponse(resp) {
    for (item of resp.data) {
        let imgElement = document.createElement("img");
        imgElement.src = item.images.downsized_medium.url;
        imgElement.alt = item.title;
        searchResults.appendChild(imgElement);
    }
}


async function fetchGiphyAPI_UsingFetchAsyncAwait(keyword) {
    var url = "https://api.giphy.com/v1/gifs/search";
    var apiKey = "GF3CGzMtVpa0xs6vZPLQjB4Bmp6hJLvD";
    var params = "api_key=" + apiKey + "&limit=5&q=" + encodeURIComponent(keyword);
    if (!keyword) {
        return;
    }
    var requestOptions = {
        method: 'GET'
    };
    // Wait until the request completes.
    const response = await fetch(url + "?" + params, requestOptions);
    // waits until the response completes
    const data = await response.json();
    processResponse(data);
}
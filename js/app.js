// Variables

// DOM References
let postContainer = document.querySelector('#post-container');
let form = document.querySelector('#search-form');
let input = document.querySelector('#input');

// Event Listeners
form.addEventListener('submit', search)

// Functions 
function search(event) {
    event.preventDefault();
    let searchQuery = input.value;
    // fetch is AJAX
    // AJAX is Asynchronous Javascript and XML
    // AJAX is getting data from the interwebz
    fetch(`https://www.reddit.com/search.json?q=${searchQuery}`)
        .then(function(response) {
           return response.json();
        })
        .then(function(json) {
            // console.log(json);
            clear();
            let posts = json.data.children; // 25 posts worth of data in an Array
    
            // Loop over every post
            for(let i = 0; i < posts.length; i++) {
                let url = posts[i].data.url; //https://v.redd.it/7cluwyzhrhd61
                // Only accept urls that end in .jpg, .png, or .gif
                let lastFourChars = url.substring(url.length - 4, url.length)
                if(lastFourChars === '.jpg' || lastFourChars === '.gif' || lastFourChars === '.png') {
                    let title = posts[i].data.title;
                    let subreddit = posts[i].data.subreddit_name_prefixed;
                    // console.log(`Url: ${url} \n Title: ${title} \n Subreddit: ${subreddit}`)
        
                    let divEl = createPost(url, title, subreddit);
                    postContainer.appendChild(divEl);
                }
            }
        })
}

function clear() {
    // While the postContainer still has child <div>'s, remove the first child
    while(postContainer.firstChild) {
        postContainer.removeChild(postContainer.firstChild);
    }
}




// This function creates a div, then returns it, based on the passed in data
function createPost(url, title, subreddit) {
    let divEl = document.createElement('div');
    let imgEl = document.createElement('img');
    imgEl.src = url;

    let h2El = document.createElement('h2');
    h2El.textContent = title;

    let h3El = document.createElement('h3');            
    h3El.textContent = subreddit;

    divEl.appendChild(h2El)
    divEl.appendChild(h3El)
    divEl.appendChild(imgEl)

    return divEl;
}




// Explaination: What .then does in terms of waiting for AJAX
// AJAX - AKA It takes a long time for the data to come back
// let data = null;

// fetch('some-url.com') // this operation takes 60 seconds real time
//     .then(function(response) { // callback function runs after the fetch finishes
//         // when the data comes back from across the internet
//         // fire this callback function
//         data = response;
//     })

// console.log(data); // do something with the data
// THIS IS A BUG - WHY?
//Adding event listener to the search bar, show tweet button, and stop tweet button
document.getElementById("searchBar").addEventListener("input", handleSearch)
document.getElementById('startStream').addEventListener("click", showTweets)
document.getElementById('stopStream').addEventListener("click", stopTweets)

//This is the URL for fetching tweet in JSON form
const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"

//This is the timer that will keep fetching new tweets
let timer

//This tweetIDs set will hold unique ID of each tweet so there won't be duplicate tweets
let tweetIDs = new Set()

//This arrayOfTweets holds neccesary JSON data that will be used to populate tweets in the HTML file
let arrayOfTweets = []

//Show tweet button function
function showTweets() {
    //Fetch tweet in JSON form
    fetchTweets()
    //Begins the timer with 5 second interval
    timer = setInterval(fetchTweets, 5000)
}

//Stops the timer from fetching new tweets
function stopTweets(){
    console.log("Timer cleared.\n")
    clearInterval(timer);
}

//This function fetch tweet in JSON form
function fetchTweets(){
    //In order to keep growing tweets in order, the current displayed tweets will be cleared.
    //Then, new tweets will be fetched, appended to old tweets, checked for duplicate, sorted again by date, and finally
    //added into the HTML.
    let parent = document.querySelector('.tweet-container')
    while( parent.firstChild ){
        parent.removeChild(parent.firstChild)
    }

    fetch(url)
        .then( response => response.json())
        .then( data => {
            // This populate the entire content of the tweets (profile picture, handle, name, texts etc etc)
            for( let i = 0; i < data.statuses.length; i++ ){
                //Grab the tweet template
                let clone = document.getElementById('tweetTemplate').content.cloneNode(true)

                //Begins extracting neccesary information from JSON and populating tweet content
                clone.querySelector('.profilePic').setAttribute('src', data.statuses[i].user.profile_image_url_https) //set profile pic
                clone.querySelector('.author').innerHTML = data.statuses[i].user.name //set author name
                clone.querySelector('.handle').innerHTML = "@" + data.statuses[i].user.screen_name //set handle
                clone.querySelector('.tweetText').innerHTML = data.statuses[i].text //set text
                clone.querySelector('.date').innerHTML = new Date(data.statuses[i].created_at).toDateString() + " " + new Date(data.statuses[i].created_at).toLocaleTimeString()

                //Check for duplicate tweet ID in the set. Then, push them into arrayOfTweeets if it's not a duplicate
                if( tweetIDs.add(data.statuses[i].id) ){
                    arrayOfTweets.push({obj: clone, 
                                        date: new Date(data.statuses[i].created_at)})
                }
                
            }//End for loop

            //Sort all tweets by date
            arrayOfTweets.sort(function(a, b){
                return a.date.getTime() - b.date.getTime()
            }).forEach( child => {
            //Then add them into HTML file
                parent.appendChild( child.obj.cloneNode(true) )
            })
        })
        .catch( error => console.log("Oh no! Here's some error(s): "+ error))
}

//Function for the search bar
function handleSearch(event) {
    //This tweets holds all 10 tweets
    let tweets = document.querySelector(".tweet-container").children

    //searchString holds the text that the user types inside the search bar 
    let searchString = event.target.value.trim().toLowerCase()

    //Check if the user has typed anything and if they fetched any tweets yet
    if( searchString === "" && tweets.length > 0 ){
        for( let tweet of tweets ){
            //If no text inside search bar, show all 10 tweets
            tweet.style.display = "flex"
        }

    //If the user typed something inside the search bar and there are tweets to show
    }else if( searchString !== "" && tweets.length > 0 ){
        for( let tweet of tweets ){
            let text = tweet.querySelector('.tweetText').innerHTML
            let words = text.toLowerCase().split(/\W+/)

            //Start matching user typed text with the content of each tweet
            if ( words.some( keyword => keyword === searchString) ){
                //If matches, show the tweet
                tweet.style.display = "flex"
            }else{
                //If doesn't match, don't show the tweet
                tweet.style.display = "none"
            }
        }
    }
}


var searchString = "";
var master_list = [];
var id_list = [];

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


function refreshTweets(list_dic, id_list2) {
    //Grabbing the tweet container
    let parent = document.querySelector('.tweet-container')

    //This holds all unique tweet objects
    let arrayOfTweets = []

    //Removes old tweets
    while( parent.firstChild ){
        parent.removeChild(parent.firstChild)
    }

    console.log("populating tweets")
    for( let i = 0; i < list_dic.length; i++ ){
        //Grab the tweet template
        let clone = document.getElementById('tweetTemplate').content.cloneNode(true)

        //Begins extracting neccesary information from JSON
        clone.querySelector('.profilePic').setAttribute('src', list_dic[i].img_url) //set profile pic
        clone.querySelector('.author').innerHTML = list_dic[i].user_name //set author name
        clone.querySelector('.handle').innerHTML = "@" + list_dic[i].screen_name //set handle
        clone.querySelector('.tweetText').innerHTML = list_dic[i].text //set text
        clone.querySelector('.date').innerHTML = " " + new Date(list_dic[i].date).toDateString() + " " + new Date(list_dic[i].date).toLocaleTimeString()
        arrayOfTweets.push( clone )
    }//End for loop    
    
    arrayOfTweets.forEach(child => {
        //Then add them into HTML file
        parent.appendChild( child.cloneNode(true) )
    })
}

function fetch_request(){
    //If the checkbox is checked, the feed will stop fetching new tweets
    let pause_checked = document.getElementById("pause").checked;
    if(!pause_checked)
    {
        // provided URL
        const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"
        fetch(url)
        .then(res => res.json()) .then(data => {  
        // do something with data
        for (let i = 0; i < data.statuses.length; i++)
        {
            if (!id_list.includes(data.statuses[i].id))
            {
                id_list.push(data.statuses[i].id)
                master_list.push(
                {
                    "id" : data.statuses[i].id,
                    "screen_name": data.statuses[i].user.screen_name,
                    "user_name": data.statuses[i].user.name ,
                    "img_url": data.statuses[i].user.profile_image_url_https,
                    "date": new Date (data.statuses[i].created_at),
                    "text": data.statuses[i].text
                })
                //console.log(data.statuses[i].user.screen_name)
                //console.log(master_list[data.statuses[i].id])
            }
        }
        //Sorting tweet objects by time
        master_list.sort((a, b) => {
            return b.date.getTime() - a.date.getTime()
        })
        let unique_id = [...new Set(id_list)]; // removes duplicates

        //Appending new tweets
        refreshTweets(master_list, unique_id)
        })
        .catch(err => {
            // error catching
        console.log(err) }) 
    }else{
        console.log("pause checked, not getting tweets")
    }
}

var intervalID = window.setInterval(fetch_request, 5000)
document.getElementById("searchBar").addEventListener("input", handleSearch)
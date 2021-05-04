
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


function refreshTweets(list_dic, id_list) {
    
    console.log("tweet refresh")
    
    let parent = document.querySelector('.tweet-container')
    let arrayOfTweets = []

    var keys = Object.keys(list_dic);
    var len = keys.length
    console.log(len)

    while( parent.firstChild ){
        parent.removeChild(parent.firstChild)
    }

    //console.log(list_dic.img_url);
    console.log("populating tweets")
    for( let i = 0; i < len; i++ ){
        //Grab the tweet template
        let clone = document.getElementById('tweetTemplate').content.cloneNode(true)

        //Begins extracting neccesary information from JSON
        clone.querySelector('.profilePic').setAttribute('src', list_dic[id_list[i]].img_url) //set profile pic
        clone.querySelector('.author').innerHTML = list_dic[id_list[i]].user_name //set author name
        clone.querySelector('.handle').innerHTML = "@" + list_dic[id_list[i]].screen_name //set handle
        clone.querySelector('.tweetText').innerHTML = list_dic[id_list[i]].text //set text
        clone.querySelector('.date').innerHTML = new Date(list_dic[id_list[i]].date).toDateString()
        arrayOfTweets[i] = clone
        
        //Check for duplicate tweet ID. Then, push them into arrayOfTweeets
    }//End for loop
    console.log(arrayOfTweets)
    
    arrayOfTweets.forEach(child => {
        //Then add them into HTML file
        parent.appendChild(child)
    })

    //middle_box.appendChild(img.src)
}

function fetch_request(){

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
                master_list[data.statuses[i].id] =
                {
                    "id" : data.statuses[i].id,
                    "screen_name": data.statuses[i].user.screen_name,
                    "user_name": data.statuses[i].user.name ,
                    "img_url": data.statuses[i].user.profile_image_url_https,
                    "date": data.statuses[i].created_at,
                    "text": data.statuses[i].text,
                }
                //console.log(data.statuses[i].user.screen_name)
                //console.log(master_list[data.statuses[i].id])
            }
        }
        master_list.sort((a, b) => (a["date"] > b["date"]) ? 1 : -1)
        let unique_id = [...new Set(id_list)]; // removes duplicates
        refreshTweets(master_list, unique_id)
        })
        .catch(err => {
            // error catching
        console.log(err) }) 
    }
    console.log("pause checked, not getting tweets")
}

var intervalID = window.setInterval(fetch_request, 5000)
document.getElementById("searchBar").addEventListener("input", handleSearch)
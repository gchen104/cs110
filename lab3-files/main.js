var id_list = []
var master_lib = {}


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
                master_lib[data.statuses[i].id] =
                {
                    "id" : data.statuses[i].id,
                    "screen_name": data.statuses[i].user.screen_name,
                    "pp_url": data.statuses[i].user.profile_image_url_https,
                    "date": data.statuses[i].created_at
                }
                console.log(data.statuses[i].user.screen_name)
                console.log(master_lib[data.statuses[i].id])
            }
        }
        console.log("done in for")
            
        })
        .catch(err => {
            // error catching
        console.log(err) }) 
    }
    console.log("pause checked, not getting tweets")
}

function populate_tweet(){
    // get element content-middle
    let mid_content = document.getElementById("content-middle")
    // grab new data to populate
    // document.getElementById("imageid").src="";
}

var intervalID = window.setInterval(fetch_request, 5000)
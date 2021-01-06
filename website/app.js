// const { countReset } = require("console");

// Create a new date instance dynamically with JS
base_URL = "localhost:3000";

const counters = document.querySelectorAll('.counter');

performAction = (e) => {  
    console.log("in");

    postData("/add")
    .then(
        updateUI()
            )
    }
    
    
    
    const updateUI = async () => {
        const request = await fetch("https://api.thingspeak.com/channels/1277610/feeds.json");
        try{
            const Data = await request.json();
            console.log(Data);
            console.log("api response: ",Data.feeds[99].field1);
            let count = 0;
                for(label of counters){
                    if(count === 0){
                        
                        label.setAttribute("data-target", Data.feeds[99].field1) ;
                        console.log(label.innerHTML);
                        count ++;
                        continue;                        
                    }

                    if( count === 1){
                        label.setAttribute("data-target", Data.feeds[99].field2) ;
                        console.log(label.innerHTML);   
                    }
                }
                
        }catch(error){
            console.log("error", error);
        }
    }

                
                /**Async Function to post data */
                postData = async (url='',data={}) =>{
                    const response = await fetch(url, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                         body: JSON.stringify(data) // body data type must match "Content-Type" header
                    });
                    try{
                        console.log(response.body);
                        const newData = await response.json();
                        console.log("new data",newData);
                        return newData;
                    }
                    catch(error){
                        console.log(response.body);
                        console.log("error", error);
                    }
                }
                
                /**Event listeners */
                document.getElementsByName("update")[0].addEventListener('click',performAction);
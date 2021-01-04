// Create a new date instance dynamically with JS
base_URL = "localhost:3000";
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();
let GasReading;  

performAction = (e) => {  
    console.log("in");
    GasReading = document.querySelectorAll("li p span");
    postData("/add")
    .then(
        updateUI()
            )
    }
    
    
    
    const updateUI = async () => {
        const request = await fetch("/api");
        try{
            const Data = await request.json();
            console.log("api response: ",Data.value);
            if(Data.value){
                for(label of GasReading){
                    console.log(label.innerHTML);
                    label.innerHTML =  "ON";
                }
            }
            else{

                for(label of GasReading){
                    console.log(label.innerHTML);
                    label.innerHTML = "OFF";
                }
            }
                
        }catch(error){
            console.log("error", error);
        }
    }
    
    // /** Async Function to get data from weather API */
    // getData = async (base, zipCode, API) =>{
        
        //     const response = await fetch(base + zipCode + API);
        //     try{
            //         const data = await response.json();
            //         //console.log(data.main.temp);
            //         return data;
            //     }
            //     catch(error){
                //         console.log("error", error);
                //     }
                // }
                
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
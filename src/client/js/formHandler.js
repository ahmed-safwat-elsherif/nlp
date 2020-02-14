function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    const postData = async ( url = '', data = {})=>{
        console.log(data);
        const response = await fetch(url, {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
         // Body data type must match "Content-Type" header        
          body: JSON.stringify(data), 
        });
    
          try {
            const newData = await response.json();
            console.log('the new data is \n'+newData);
            console.log(newData);
            return newData;
          }catch(error) {
          console.log("error", error);
          }
    }
    postData('http://localhost:8081/in',{
        text:formText,
    })
    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = 
        `<br> 
        Polarity:   ${res.polarity} <br> 
        Subjectivity:   ${res.subjectivity}<br>
        Text:   ${res.text}`
    })
}

export { handleSubmit }

fetch('http://official-joke-api.appspot.com/random_joke')
.then(function (response){
    return response.json();
    console.log(response);
})
.then(function (jasonData){
    console.log(jasonData)
    let setup = jasonData.setup;
    let setupElement = document.createElement('h3');
    setupElement.innerHTML = setup;
    document.body.appendChild(setupElement);

    let punchline = jasonData.punchline;
    let punchlineElement = document.createElement('h3');
    punchlineElement.innerHTML = punchline;
    document.body.appendChild(punchlineElement);

})
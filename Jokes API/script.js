fetch("https://hplussport.com/api/products?order=price")
.then(function (response){
    return response.json();
})
.then(function (jsonData){
    // console.log(jsonData)
    for (let items in jsonData)
    {
        var productName = jsonData[items].name;
        var product = document.createElement('li');
        product.innerHTML = productName;
        document.body.appendChild(product);

        var productImg = jsonData[items].image;
        var image = document.createElement('img');
        image.setAttribute('src', productImg);
        document.body.appendChild(image);

        var price = jsonData[items].price;
        var priceElement = document.createElement('h6');
        priceElement.innerHTML = price;
        document.body.appendChild(priceElement);

    }
})
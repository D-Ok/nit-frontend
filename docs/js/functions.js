

let chosenProducts = [];
let quantities = [];

var sects = document.getElementsByClassName("sect");
showSection(0);
function showSection(n){
    $(".sect.active").removeClass("active");
    console.log(sects[n]);
    $(sects[n]).addClass("active");
}

let _addProduct = ({
                       id,
                       name,
                       image_url,
                       description,
                       price,
                       special_price,
                   }) => {
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-3">`);
    let $viewcontainer = $(`<a class = "view-product" onclick = "viewProduct(${id})" data-product-id="${id}">`);
    $product.append($viewcontainer);
    $viewcontainer.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
    $viewcontainer.append($(`<span class="product-title">`).text(name));
    if(special_price!=null){
        $viewcontainer.append($(`<span class="old-price">`).text(price));
        $viewcontainer.append($(`<span class="product-special-price">`).text(special_price));
    }
    else{
        $viewcontainer.append($(`<span class="product-price">`).text(price));
    }
    //$product.append($(`<p class="product-description">`).text(description));
    $product.append($(`<button class="addToCartBtn" onclick = "appendProductToCart(${id})" data-product-id="${id}">`).text("Add to cart"));
    return $product;
};


let _addProductForView = ({
                       id,
                       name,
                       image_url,
                       description,
                       price,
                       special_price,
                   }) => {
    let $product = $(`<div class="view-product-container">`);
    let $viewcontainer = $(`<div class = "view-view-product">`);
    let $textcontainer = $(`<div class = "text-view-product">`);
    $product.append($viewcontainer);
    $product.append($textcontainer);
    $viewcontainer.append($(`<img src="${image_url}" alt="${name}" class="view-img">`));
    $textcontainer.append($(`<span class="product-title">`).text(name));
    if(special_price!=null){
        $textcontainer.append($(`<span class="old-price">`).text(price));
        $textcontainer.append($(`<span class="product-special-price">`).text(special_price));
    }
    else{
        $textcontainer.append($(`<span class="product-price">`).text(price));
    }
    $textcontainer.append($(`<p class="view-product-description">`).text(description));
    $textcontainer.append($(`<button class="view-addToCartBtn" onclick = "appendProductToCart(${id})" data-product-id="${id}">`).text("Add to cart"));
    return $product;
};

let _addProductForCart = ({
                       id,
                       name,
                       image_url,
                       description,
                       price,
                       special_price,
                   }) => {
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-3">`);
    let $viewcontainer = $(`<a class = "view-product">`);
    $product.append($viewcontainer);
    $viewcontainer.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
    $viewcontainer.append($(`<span class="product-title">`).text(name));
    if(special_price!=null){
        $viewcontainer.append($(`<span class="old-price">`).text(price));
        $viewcontainer.append($(`<span class="product-special-price">`).text(special_price));
    }
    else{
        $viewcontainer.append($(`<span class="product-price">`).text(price));
    }
    let $counter = $(`<span class="counter" data-product-id="${id}">`);
    $product.append($(`<button class="plus-button" onclick = "addQuantity(${id})">`).text("+"));
    $counter.append($(`<span class="current-num">`).text("1"));
    $product.append($counter);
    $product.append($(`<button class="minus-button" onclick = "minusQuantity(${id})">`).text("-"));
    return $product;
};


/*function addQuantity(id){
    let n = chosenProducts.indexOf(id);
    quantities[n]++;
    let c = $(".counter");
    c.forEach(){
        if($(this).attr('data-category-id')==id){
            this.empty();
            this.append($(`<span class="current-num">`).text(quantities[id]));
        }

    }
}

function minusQuantity(id){
    let n = chosenProducts.indexOf(id);
    if(quantities[n]<=0)
        quantities[n]--;
    let c = $(".counter");
    c.forEach(){
        if($(this).attr('data-category-id')==id){
            this.empty();
            this.append($(`<span class="current-num">`).text(quantities[id]));
        }

    }
}*/

function appendProductToCart(id){
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/' + id,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            //console.log('Loaded via AJAX!');
            //console.log(json);
            //console.table(json);
            console.log(!chosenProducts.contains(id));
            if(!chosenProducts.contains(id)){
                chosenProducts.add(id);
                $('.empty-cart').style("display: none");
                $('.cart-products').append(_addProductForCart(json));
            }
            // console.log('Added to grid');
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

function showProduct(id){
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/' + id,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            console.log('Loaded via AJAX!');
            console.log(json);
            //console.table(json);
            $('.product-view').append(_addProductForView(json));
            // console.log('Added to grid');
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

function viewProduct(id){
    $(".sect.active").removeClass("active");
    $("#product-view-section").addClass("active");
    $(".product-view").empty();
    showProduct(id);
}



let _addCategory = ({
                        id,
                        name,
                        description
                    }) => {
    let $category = $(`<div class="category-item" data-category-id="${id}">`);
    $category.append($(`<a href = "#" class="category-name">`).text(name));
    //$category.append($(`<p class="category-description">`)).text(description);
    //$category.append($(`<span class="category-description">`).text(description));
    return $category;
};




$.ajax({
    url: 'https://nit.tron.net.ua/api/order/add',
    method: 'post',
    data: 'name=Ivan&email=ivan@ivan.com&phone=123&products[2]=5&products[4]=1&token=....',
    dataType: 'json',
    success: function(json){
        console.log(json);
    },
});

jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        console.log('Loaded via AJAX!');
        // console.log(json);
        //console.table(json);
        json.forEach(product => $('.product-grid').append(_addProduct(product)));
        // console.log('Added to grid');
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});

jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        //console.log('Loaded via AJAX!');
        // console.log(json);
        // console.table(json);
        json.forEach(category => $('.categories-list').append(_addCategory(category)));
        //console.log('Added to categories');
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});


function showGoodsFromCategory(id) {
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list/category/' + id,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            console.log('Loaded via AJAX!');
            // console.log(json);
            //console.table(json);
            json.forEach(product => $('.product-grid').append(_addProduct(product)));
            // console.log('Added to grid');
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}





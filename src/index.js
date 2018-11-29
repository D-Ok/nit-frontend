console.log('Hello!');
console.log(`The time is ${new Date()}`);
import './scss/main.scss';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
window.jQuery = $;
window.$ = $;


let _addProduct = ({
                       id,
                       name,
                       image_url,
                       description,
                       price,
                       special_price,
                   }) => {
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-3">`);
    let $viewcontainer = $(`<a class = "view-product" data-product-id="${id}">`);
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
    $product.append($(`<button class="addToCartBtn" data-product-id="${id}">`).text("Add to cart"));
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
    $textcontainer.append($(`<button class="view-addToCartBtn"  data-product-id="${id}">`).text("Add to cart"));
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
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-4">`);
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
    $product.append($(`<button class="plus-button">`).text("+"));
    let $counter = $(`<span class="counter" data-product-id="${id}">`);
    $counter.append($(`<span class="current-num">`).text("1"));
    $product.append($counter);
    $product.append($(`<button class="minus-button" >`).text("-"));
    return $product;
};

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

jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        json.forEach(category => $('.categories-list').append(_addCategory(category)));
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});

function showProductView(id){
    $(".product-view").empty();
    $('.product-grid').empty();
        jQuery.ajax({
            url: 'https://nit.tron.net.ua/api/product/' + id,
            method: 'get',
            dataType: 'json',
            success: function (json) {
                console.log(json);
                $('.product-view').append(_addProductForView(json));
                $(".addToCartBtn").on('click', function(){
                    let prId = $(this).attr('data-product-id');
                    appendProductToCart(prId);
                    console.log('Added to cart');
                });
            },
            error: function (xhr) {
                alert("An error occured: " + xhr.status + " " + xhr.statusText);
            },
        });
        $(".sect.active").removeClass("active");
        $("#product-view-section").addClass("active");

    }

function displayAllProducts(){
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list',
        method: 'get',
        dataType: 'json',
        success: function(json){
            //console.log('Loaded via AJAX!');
            // console.log(json);
            //console.table(json);
            json.forEach(product => $('.product-grid').append(_addProduct(product)));
            $(".view-product").on('click', function(){
                let prId = $(this).attr('data-product-id');
                showProductView(prId);
            });
            $(".addToCartBtn").on('click', function(){
                let prId = $(this).attr('data-product-id');
                appendProductToCart(prId);
            });
            console.log('Worked');
        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });

}

function showGoodsFromCategory(id) {
    $(".product-view").empty();
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/list/category/' + id,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            console.log('Loaded via AJAX!');
            json.forEach(product => $('.product-grid').append(_addProduct(product)));
            $(".view-product").on('click', function(){
                let prId = $(this).attr('data-product-id');
                showProductView(prId);
            });
            $('.addToCartBtn').on('click', function(){
                let prId = $(this).attr('data-product-id');
                appendProductToCart(prId);
            });
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

function appendProductToCart(id){
    jQuery.ajax({
        url: 'https://nit.tron.net.ua/api/product/' + id,
        method: 'get',
        dataType: 'json',
        success: function (json) {
            $('.cart-products').append(_addProductForCart(json));
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}




    $(document).ready(function () {
        $(".store-name").on('click', function(){
            $(".product-grid").empty();
            displayAllProducts();
            $(".sect.active").removeClass("active");
            $("#products-section").addClass("active");
        });
        $(".menu-categories").on('click', function(){
            $(".sect.active").removeClass("active");
            $("#categories-section").addClass("active");
        });
        $(".all-products").on('click', function(){
            $(".product-grid").empty();
            displayAllProducts();
            $(".sect.active").removeClass("active");
            $("#products-section").addClass("active");
        });
        $(".menu-info").on('click', function () {
            $(".sect.active").removeClass("active");
            $("#info-section").addClass("active");
        });
        $(".menu-cart").on('click', function () {
            $(".sect.active").removeClass("active");
            $("#cart-section").addClass("active");
        });
        $('.category-item').click(function () {
            let catId = $(this).attr('data-category-id');
            $(".sect.active").removeClass("active");
            $("#products-section").addClass("active");
            $(".product-grid").empty();
            showGoodsFromCategory(catId);
        });


    });










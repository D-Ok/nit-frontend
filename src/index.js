console.log('Hello!');
console.log(`The time is ${new Date()}`);
import './scss/main.scss';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
window.jQuery = $;
window.$ = $;

/*let a = document.getElementById('click-display-categories');
a.onclick = function displayCategories() {
    console.log("aaaaa");
    $("section.active").removeClass("active");
    console.log($("section.active"));
    $("#categories-section").addClass("active");
    console.log('Added');
    return undefined;
}*/

let _makeHtml = ({
                     id,
                     name,
                     image_url,
                     description,
                     price,
                 }) => {
    let $product = $(`<div class="card col-xs-12 col-sm-4 col-md-3" data-product-id="${id}">`);
    $product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
    $product.append($(`<span class="product-title">`).text(name));
    return $product;
};

/*let _addCategory = ({
                     id,
                     name,
                     description
                 }) => {
    let $category = $(`<li class="category-item" data-category-id="${id}">`);
    $category.append($(`<a class="category-name">`).text(name));
    //$category.append($(`<span class="category-description">`).text(description));
    return $category;
};*/






jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/product/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        console.log('Loaded via AJAX!');
        // console.log(json);
        //console.table(json);
        json.forEach(product => $('.product-grid').append(_makeHtml(product)));
       // console.log('Added to grid');
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});

/*jQuery.ajax({
    url: 'https://nit.tron.net.ua/api/category/list',
    method: 'get',
    dataType: 'json',
    success: function(json){
        console.log('Loaded via AJAX!');
        // console.log(json);
        console.table(json);
        json.forEach(category => $('.categories-list').append(_addCategory(category)));
        console.log('Added to categories');
    },
    error: function(xhr){
        alert("An error occured: " + xhr.status + " " + xhr.statusText);
    },
});*/

//displayCategories();

let sects = document.getElementsByClassName("sect");
showSection(0);
function showSection(n){
    $(".sect.active").removeClass("active");
    console.log(sects[n]);
    $(sects[n]).addClass("active");
}




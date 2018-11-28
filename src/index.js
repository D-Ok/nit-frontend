console.log('Hello!');
console.log(`The time is ${new Date()}`);
import './scss/main.scss';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
window.jQuery = $;
window.$ = $;





    $(document).ready(function () {

        /*$('.addToCartBtn').click(function(){
            console.log('Sent to cart');
            let prId = $(this).attr('data-product-id');
            appendProductToCart(prId);
        });*/

        $('.category-item').click(function () {
            let catId = $(this).attr('data-category-id');
            $(".sect.active").removeClass("active");
            $("#products-section").addClass("active");
            $(".product-grid").empty();
            showGoodsFromCategory(catId);
        });


    });







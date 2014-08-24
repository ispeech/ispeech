<?php $this -> layout('component/layout') ?>
<?php $this -> title = 'ISPEECH' ?>


<?php $this -> start('content') ?>

	<div class="mask"></div>
	<ul class="pagination">
    <li>
        <a class="active" href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
    <li>
        <a href="#"></a>
    </li>
</ul>

	<?php $this -> insert('component/header') ?>
	<?php $this -> insert('component/navbar') ?>


	<?php $this -> insert('component/home_content') ?>
	<?php $this -> insert('component/slidr') ?>
	<?php $this -> insert('component/footer') ?>

<?php $this -> end() ?>


<?php $this -> start('javascript') ?>
<script>
slidr.create("slidr-inline-dynamic", {
    transition: "cube",
    controls: "none"
}).add("v", ["one", "three", "two", "one"]).auto(3E3, "up");
slidr.create('slidr-api-demo', {
    breadcrumbs: true,
    overflow: true
}).add('h', ['one', 'two', 'three', 'one'])
    .add('v', ['five', 'four', 'three', 'five'], 'cube')
    .start();



$('.sticky-wrapper').waypoint('sticky');


var heroImage = $('.hero-image');

$(window).scroll(function() {
    var $this = $(this);
    var top = $this.scrollTop();
    heroImage.css('transform', 'translateY(' + (top/2) + 'px)');
});

$('#scroll-top').on('click',function(){
	var top = $(window).height();
	// $(window).scrollTop(top);
	$('html,body').animate({scrollTop:top},1000);
})
</script>
<?php $this -> end() ?>
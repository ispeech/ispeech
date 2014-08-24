<?php $this -> layout('component/layout') ?>
<?php $this -> title = 'ISPEECH' ?>


<?php $this -> start('content') ?>

	<div class="mask"></div>



	<?php $this->insert('component/navbar') ?>

	<div class="container">
		<?php $this->insert('component/tab') ?>
		<?php $this->insert('component/footer') ?>
	</div>



<?php $this -> end() ?>

<?php $this -> start('javascript') ?>
<script>

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
<?php $this -> layout('component/layout') ?>
<?php $this -> title = 'ISPEECH' ?>


<?php $this -> start('content') ?>

	<div class="mask"></div>

	<?php $this -> insert('component/navbar') ?>

	<?php $this -> insert('component/search') ?>
	<?php $this -> insert('component/slidr') ?>
	<?php $this -> insert('component/footer') ?>

<?php $this -> end() ?>


<?php $this -> start('javascript') ?>
<script>
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
</script>
<?php $this -> end() ?>
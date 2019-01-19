$(function(){	
	$('.bar').click(function(){
		$('.top-menu ').slideToggle(300, function(){
			if ($(this).css('display')==='none'){
				$(this).removeAttr('style');
			}});	
	})
	
});
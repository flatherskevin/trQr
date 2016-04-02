//JavaScript for trQ_MytrQs.html

$(document).ready(function(){
	$('.divHide').hide(); 
	
	//Initializes trQ-current default-zero position on page load
	var leftValue = 0;
	var rightValue = $('.progress-container').width() - leftValue;
	var progressCurrentAdj = $('.progress-current').width()/2;
	$('.progress-done').width(leftValue + 'px');
	$('.progress-togo').width(rightValue + 'px');
	$('.progress-current').css('left',leftValue - progressCurrentAdj);

	//Allows for width change upon submission. Also error checks the input (only numerical values allowed)
	function updateProgress(thisDiv){
		var newValue = $(thisDiv).closest('.trQ-all').find($('.trQ-newValue')).html();
		if ($.isNumeric(newValue)) {
			leftValue += parseInt(newValue,10);
			if (leftValue > $(thisDiv).closest('.trQ-all').find($('.progress-container')).width()) {
				leftValue = $(thisDiv).closest('.trQ-all').find($('.progress-container')).width();
			} else if (leftValue < 0) {
				leftValue = 0;
			}
			rightValue = $(thisDiv).closest('.trQ-all').find($('.progress-container')).width() - leftValue;
			$(thisDiv).closest('.trQ-all').find($('.progress-done')).width(leftValue + 'px');
			$(thisDiv).closest('.trQ-all').find($('.progress-togo')).width(rightValue + 'px');
			$(thisDiv).closest('.trQ-all').find($('.progress-current')).css('left',leftValue - progressCurrentAdj);
		} else {
			alert("Please input a number")
		}
		$('.trQ-newValue').html('');
	}
	
	function markProgress(appendLoc){
		var progressMarkAdj = $(appendLoc).closest('.trQ-all').find($('.progress-mark')).width()/2;
		var progressMarkPos = $(appendLoc).closest('.trQ-all').find($('.progress-done')).width();
		$('.progress-mark:first').clone(true).removeClass('divHide').prependTo($(appendLoc).closest('.container-trQ').find('.progress-container')).css('left',progressMarkPos - progressMarkAdj).show();
	}
	
	//User clicks "post" button and progress is updated
	$('.trQ-post').click(function(){
		updateProgress(this);
		markProgress(this);
		postProgress(this);
	});
	
	//Multiple lines not allowed in value area
	($('.trQ-newValue')).keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
		}
	});
	
	$('.trQ-newPost').keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
		}
	});
	
	$('.trQ-newPost').keyup(function(event){
		if(event.keyCode == 13){
			$(this).closest('.footer-trQ').find('.trQ-newValue').focus();
		}
	});

	//User can submit using ENTER key
	$('.trQ-newValue').keyup(function(event){
		if(event.keyCode == 13){
			updateProgress(this);
			markProgress(this);
			postProgress(this);
		}
	});
	
	//Post text is submitted to the posting area on the left
	function postProgress(appendLoc){
		var postDate = new Date();
		postDate = postDate.getUTCMonth() + 1 + '/' + postDate.getUTCDate() + '/' + postDate.getUTCFullYear();
		var postText = $(appendLoc).closest('.container-trQ').find('.trQ-newPost');
		var postNew = $('.post-box:first').clone(true).removeClass('divHide').appendTo($(appendLoc).closest('.trQ-all').find('.post-container')).show();
		postNew.find('.post-date').html(postDate);
		postNew.find('.post-text').html(postText.html());
		postText.html('');
	}
	
	//Modal window and overlay are shown
	$('.button-addtrQ').click(function(){
		$('.modal-container').removeClass('divHide').show();
		$('.modal-overlay').removeClass('divHide').show();
	});
	
	//Modal container and overlay are hidden when the overlay is clicked
	$('.modal-overlay').click(function(){
		$('.modal-overlay').css('class','divHide').hide();
		$('.modal-container').css('class','divHide').hide();
	});
	
	$('.modal-submit').click(function(){
		modalAssign();
		$('.modal-overlay').css('class','divHide').hide();
		$('.modal-container').css('class','divHide').hide();
	});
	
	function modalAssign(thisDiv){
		var title = $('.modal-trQ-title');
		var start = $('.modal-trQ-start');
		var end = $('.modal-trQ-end');
		var units = $('.modal-trQ-units');
		var newtrQ = $('.trQ-all:first').clone(true).removeClass('divHide').appendTo($('.page-body')).show();
		newtrQ.find('.trQ-name').html(title.html());
		title.html('');
		newtrQ.find('.trQ-newUnit').html(units.html());
		units.html('');
	}
});
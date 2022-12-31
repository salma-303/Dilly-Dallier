function random_item(items)
{
  
return items[Math.floor(Math.random()*items.length)];
     
}

var items = [1,2,3];
console.log(random_item(items));


$(document).ready(function() {	//detects this state of readiness be run lma el DOM yb2a ready
	//check if the cell is already filed loop
	$('input').each(function() {
		var busyVal = $(this).val(); //get value l el cell
		if (busyVal > 0) { 
			$(this).addClass('busy').attr('disabled','disabled'); 
		} else {
			$(this).addClass('playable');	
		}
	});

    //to ensure en el numbers elly maktoba mn 1 to 9
	$('input').keyup(function(e) {
	    $(this).val($(this).val().replace(/[^1-9\.]/g,'')); //replace anything that is not a number with nothing.
	    var val = $(this).val();
	    var valLength = val.length;
	    var maxCount = $(this).attr('maxlength');
	    if(valLength>maxCount){
	        $(this).val($(this).val().substring(0,maxCount)); //limit the number of characters
	    }
	    $(this).blur(); //removes keyboard focus from the current element
	});

    // check rows, colmns *CHECK BUTTON*
	$('.checkit').click(function() {	
		checkRows();
		checkColumns();
		checkSectors();
	});

    // checks to see if all the cells are filled, then checks for duplicates *DONEBUTTON* then reset
	$('.completegame').click(function() {
	    var empty = $('input').filter(function() {
	        return this.value === '';
	    });
	    if(empty.length) {
		    $('.notfilled').show();
		    setTimeout( function() {
				$('.notfilled').fadeOut();			
			}, 1000 );
	    } else {
		    $('.notfilled').hide();
	        checkRows();
			checkColumns();
			if(!$('.error').hasClass('omg')) {
				$('.completed').show();
                document.location.reload(true);
			}
	    }				
	});

    //Row Checker function
	var checkRows = function(sectionToCheck) {
		$('.keyrow').each(function() {
			var thisRow = $(this).attr('class').split(' ')[1];
			var sectionToCheck = '.'+thisRow;
			dupes(sectionToCheck); // remove el duplicates for all rows
		});		
	}

    //Column Checker function
	var checkColumns = function(sectionToCheck) {
		$('.keycolumn').each(function() {
			var thisColumn = $(this).attr('class').split(' ')[2];
			var sectionToCheck = '.'+thisColumn;
			dupes(sectionToCheck); // remove el duplicates for all colmns
		});	
	}
	//Sector Checker function
	var checkSectors = function(sectionToCheck) {
		$('.keysector').each(function() {
			var thisSector = $(this).attr('class').split(' ')[0];
			var sectionToCheck = '.'+thisSector;
			dupes(sectionToCheck);
		});	
	}

    // main function that looks for all dupes in columns, rows and sectors 
	var dupes = function(sectionToCheck) {
		var sectionValues = [];
		var sectionValues = $(sectionToCheck).map(function() {
			return this.value;
		}).get();
		sectionValues = sectionValues.filter(Number);
		function hasDuplicate(arr) {
		    var i = arr.length, j, val;
		
		    while (i--) {
		    	val = arr[i];
		    	j = i;
		    	while (j--) {
		    		if (arr[j] === val) {
		    			return true;
		    		}
		    	}
		    }
		    return false;
		}
		if (hasDuplicate(sectionValues)) {
			$('.error').addClass('omg').show();
			$('.ok').hide();
			$('.completed').hide();
			$(sectionToCheck).addClass('inerror');	
			setTimeout( function() {
				$(sectionToCheck).removeClass('inerror');
				$('.error').removeClass('omg').fadeOut();			
			}, 2000 );
		} else {
			if(!$('.error').hasClass('omg')) {
				$('.ok').show();
			}
			setTimeout( function() {
				$('.ok').fadeOut();			
			}, 2000 );

		}
	}	
});


function first(){
    window.location.href = 'first.html';

}

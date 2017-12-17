$(function(){

	var textView = $('.text-view input');
	var map = {
		special : {
			setuid : { 'checked' : false , value : 4 },
			setgid : { 'checked' : false , value : 2 },
			stickybit : { 'checked' : false , value : 1 },
		},

		user : {
			read : { 'checked' : false , value : 4 },
			write : { 'checked' : false , value : 2 },
			execute : { 'checked' : false , value : 1 },
		},

		group : {
			read : { 'checked' : false , value : 4 },
			write : { 'checked' : false , value : 2 },
			execute : { 'checked' : false , value : 1 },
		},

		other : {
			read : { 'checked' : false , value : 4 },
			write : { 'checked' : false , value : 2 },
			execute : { 'checked' : false , value : 1 },
		}
	};

	var index = ['special','user','group','other'];
	var Value = { special : 0 , user : 0 , group : 0 , other : 0 };

	function calculate(classes,checked){
		classes= classes.split(' ');
		var i = classes[0];
		var k = classes[1];
		map[i][k].checked = checked;
		
		if (checked ){
			Value[i] = Value[i] + map[i][k].value;
		} else {
			Value[i] = Value[i] - map[i][k].value;
		}
		showValue();
		
	}

	function resetAll(){
		for (var i in map) {
			for (var j in map[i]){
				map[i][j].checked = false;
				$('.' + i + '.' + j).prop('checked',false);
			}
		}

		for (var ii in Value){
			Value[ii] = 0;
		}
		showValue();
	}

	function showValue(){
		textView.val( Value.special.toString() + Value.user.toString() + Value.group.toString() + Value.other.toString()); 
	}

	$('input[type=checkbox]').change(function(e){
		calculate($(this).attr('class'), $(this).prop('checked') );
	});

	textView.click(function(e){
		var startPos = this.selectionStart;
		if ( startPos == 4) startPos = 3;
		this.focus();
		this.setSelectionRange(startPos,startPos + 1);
	});

	textView.keypress(function(e){
		if (e.which == 13) {
			$('.text-view button').trigger('click');
			return;	
		}

	    var s = this.selectionStart;
	    this.value = this.value.substr(0, s) + this.value.substr(s + 1);
	    this.selectionEnd = s;
	});

	$('.text-view button').click(function(){

		$('input[type=checkbox]').prop('checked',false);
		
		var valore = textView.val();
		var syntaxError = false;

		if ( valore.length != 4 ) {
			showValue();
			return;	
		}
		
		for (i = 0; i < valore.length ; i++){
			
			var v = valore.charAt(i);
			var sel;
			
	
			switch (v){
				case '1': //execute
			
					if ( index[i] == 'special') sel = '.special.stickybit';
					else sel = '.'+index[i] + '.execute';
				
				break;

				case '2': // write
					if ( index[i] == 'special') sel = '.special.setgid';
					else sel = '.'+index[i] + '.write';

				break;

				case '3': // execute + write
					if ( index[i] == 'special') {
						sel = '.special.stickybit,.special.setgid';
					}
					else {
						sel = '.'+index[i] + '.execute,.'+index[i] + '.write';
					}
				break;

				case '4': // read
					if ( index[i] == 'special') sel = '.special.setuid';
					else sel = '.'+index[i] + '.read';
				break;

				case '5': //read + execute
					if ( index[i] == 'special') {
						sel = '.special.setuid,.special.stickybit';
					}
					else {
						sel = '.'+index[i] + '.read,.'+index[i] + '.execute';
					}
				break;

				case '6': //read + write
					if ( index[i] == 'special') {
						sel = '.special.setuid,.special.setgid';
					}
					else {
						sel = '.'+index[i] + '.read,.'+index[i] + '.write';
					}
				break;

				case '7': //read + write + execute
					if ( index[i] == 'special') {
						sel = '.special.setuid,.special.setgid,.special.stickybit';
					}
					else {
						sel = '.'+index[i] + '.read,.'+index[i] + '.write,.'+index[i] + '.execute';
					}
				break;

			}

			if ( !isNaN(v) && v < 8 && v >= 0) {
				Value[index[i]] = parseInt(v);
				$(sel).prop('checked',true);
			} else {
				syntaxError = true;
			}
		

		}

		showValue();
		if ( syntaxError ) resetAll();

	});


});

	/*
	var Special = [
		$('.setuid'),
		$('.setgid'),
		$('.stickybit')
	];

	var User = [
		$('.user.read'),
		$('.user.write'),
		$('.user.execute')
	];

	var Group = [
		$('.group.read'),
		$('.group.write'),
		$('.group.execute')
	];


	var Other = [
		$('.other.read'),
		$('.other.write'),
		$('.other.execute')
	];
*/
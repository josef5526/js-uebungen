let oben = 0;
let vorne = 1;
let unten = 2;
let hinten = 3;
let links = 4;
let rechts = 5;
// shift = 16
// strg = 17
let extendLeftRight = 17;

var cube = {
	sides:[2,1,5,6,3,4],
	
	dumpCube:function(){
		var text = 'V:'+cube.sides[vorne]+', O:'+cube.sides[oben] + ', U:' + cube.sides[unten];
		text += ', L:'+cube.sides[links] + ', H:' + cube.sides[hinten] + ', R:'+ cube.sides[rechts];
		console.log( text );
	},
		
	cubeHandler:function( direction, shift ){
		var lastVorne = cube.sides[vorne];
		var newVorne;
		var help;
		switch ( direction ){
		case 38 : // up
		case 40 : // down
			if (direction == 38){
				cube.sides[oben] = cube.sides[vorne];
				cube.sides[vorne] = cube.sides[unten];
			} else {
				cube.sides[vorne] = cube.sides[oben];
				cube.sides[oben] = cube.sides[hinten];
			}
			cube.sides[unten] = 7 - cube.sides[oben];
			cube.sides[hinten] = 7 - cube.sides[vorne];
			newVorne = cube.sides[vorne];
			break;
		case 37 : // left
		case 39 : // right
			if (shift){
				if (direction == 37){ // shift + left
					cube.sides[unten] = cube.sides[links];
					cube.sides[links] = cube.sides[oben];
				} else {    // shift + right
					cube.sides[links] = cube.sides[unten];
					cube.sides[unten] = cube.sides[rechts];
				}
				cube.sides[oben] = 7 - cube.sides[unten];
				cube.sides[rechts] = 7 - cube.sides[links];
				return;
			} else {
				if (direction == 37){ // links
					cube.sides[links] = cube.sides[vorne];
					cube.sides[vorne] = cube.sides[rechts];
				} else {  // rechts
					cube.sides[vorne] = cube.sides[links];
					cube.sides[links] = cube.sides[hinten];
				}
				cube.sides[rechts] = 7 - cube.sides[links];
				cube.sides[hinten] = 7 - cube.sides[vorne];
				newVorne = cube.sides[vorne];
			}
			break;
		default:
			return;
		}
		$( '[data-ind="'+lastVorne+'"]' ).hide();
		$( '[data-ind="'+newVorne+'"]' ).show();
	},
	
	arrowClick:function( e ){
		e.preventDefault();
		var dir = $( this ).attr( 'data-ind' ) * 1;
		cube.cubeHandler( dir, false );
		cube.dumpCube();
	},
	
	sArrowClick:function( e ){
		e.preventDefault();
		var dir = $( this ).attr( 'data-ind' ) * 1;
		cube.cubeHandler( dir, true );
		cube.dumpCube();
	}
}

$( document ).ready( function() {
	$( '.arrow,.middleArrow' ).on( 'click', cube.arrowClick );
	$( '.sArrow' ).on( 'click', cube.sArrowClick );
	cube.dumpCube();
//	$( document ).on( 'keyup', cube.keyupHandler );
});

// my functions
		var _e = function ( id ) {
			return document.getElementById( id );
		}
		
		var einlesenZahl = function( text ){
			var zahl;
			zahl = parseFloat( text.replace( ',','.' ) );
			return zahl;
		}
		
		var formatZahl = function( usd ) {
			usd = Math.round( usd * 100) / 100;
			return usd.toString().replace( '.',',' );
		}
		
		var random1_10 = function(){
			return Math.floor (( Math.random() * 10) + 1 );
		}

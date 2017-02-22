		var _e = function ( id ) {
			return document.getElementById( id );
		}
		
		var einlesenFloat = function( text ){
			var zahl;
			zahl = parseFloat( text.replace( ',','.' ) );
			return zahl;
		}
		
		var formatZahlRound2 = function( zahl ) {
			zahl = Math.round( zahl * 100) / 100;
			return zahl.toString().replace( '.',',' );
		}

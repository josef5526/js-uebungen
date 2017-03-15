let filler = '<span>  + + +  </span>';
var wjTicker = {
	html:{},
	$html:{},
	footer:{},
	newsTicker:'',
	$body:{},
	$head:{},

	// fetch title and href for ticker	
	handleOneNewsEntry:function( ind, aentry ){
		var href = $( aentry ).attr( 'href' );
		var title = $( aentry ).find( 'h1' ).html();
		wjTicker.addToNewsTicker( href,title );
	},
	
	// add html for given title and href to ticker-html
	addToNewsTicker:function( href, title ){
		wjTicker.newsTicker += '<a href=\'' + href + '\'>' + title + '</a>' + filler;
	},
	
	// control newsTicker preparation and insertion
	fetchNews:function( inHTML ){
		wjTicker.initNewsTicker();
		var $newsDiv = $( 'div.grid.news', wjTicker.$body );   // fetch elements containing the news 
		var news = $( $newsDiv.find( 'a' ) );                  // accumulate the elements (all are links)
		$.each(news, wjTicker.handleOneNewsEntry );            // add to ticker html
		wjTicker.modifyPage();								   // add ticker to loaded page (in the footer)
		wjTicker.makeFooter();								   // add ticker to own footer
	},
	
	initNewsTicker: function(){
		wjTicker.newsTicker = filler;
	},
	
	// load page into iFrame container
	insertHTML:function( inHTML ){
		var doc = document.getElementById('container').contentWindow.document;   // get document object of iFrame
		try{
			doc.open();					// open document
			doc.write( inHTML );		// write loaded page
			doc.close();				// close it
			wjTicker.$body = $(  $('body', $( doc )) );  // get body of loaded page
			wjTicker.$head = $(  $('head', $( doc )) );	 // get head of loaded page
			$( $( '#container' ) ).ready( function(){	 // when loaded page ready		
				wjTicker.$body = $(  $('body', $( doc )) );  // do it again
				wjTicker.$head = $(  $('head', $( doc )) );
			});
		}catch (error){
			// loading page from server causes exception : $ undefined within loaded page.
			// downt know why. Continuation is possible.
		}
		finally{
			wjTicker.$body = $(  $('body', $( doc )) ); // to be sure 
			wjTicker.$head = $(  $('head', $( doc )) );
			wjTicker.fetchNews();                       // start ticker setup
		}
	},
	
	// insert ticker into footer of loaded page
	modifyPage:function(){
		// add ticker-css to loaded page
		var $css = $( $( '<link href="wjNewsTicker-styles.css" rel="stylesheet" type="text/css">' ) );
		$( wjTicker.$head ).append( $css );
		// get footer
		var $footer = $( 'footer', wjTicker.$body);
		// clear footer
		$footer.html( '' );
		// create ticker element and add it to footer
		$( '<div class="marquee">' ).html( wjTicker.newsTicker ).appendTo( $footer );
	},
	
	// insert ticker also in own footer
	makeFooter:function(){
		$( 'footer' ).html( '' );
		$( '<div class="marquee">' ).html( wjTicker.newsTicker ).appendTo( $( 'footer' ) );
	},
		
	// load page from server
	loadPage:function(){
 	   $.ajax({
				dataType:'text',
				url:'http://wifi.1av.at/516/tn/news.php',
				success:function( data ){
					wjTicker.insertHTML( data );
				}
		   }); 
	}
}

$( document ).ready( function(){
	wjTicker.loadPage();
});

(function( window ){
    window.watchResize = function( callback ){
        var resizing;
        callback.size = 0;
        function done()
        {
            var curr_size = window.innerWidth;
            clearTimeout( resizing );
            resizing = null;
            // only run on a true resize
            if ( callback.size != curr_size )
            {
                callback();
                callback.size = curr_size;
            }
        }
        window.addEventListener('resize', function(){
            if ( resizing )
            {
                clearTimeout( resizing );
                resizing = null;
            }
            resizing = setTimeout( done, 50 );
        });
        callback();
    };
}(window));

if ( ! 'classList' in document.body ) { return; }

    var $html = document.getElementsByTagName(html)[0],
		page_classes = $html.classList,
		$menu_opener = document.getElementById(nav-jump),
		$menu_closer = document.getElementById(menu-close),
		drawer_enabled_class = drawer-nav-enabled,
		drawer_open_class = drawer-nav-open;

	var toggleDrawerNav_running = false;
	function toggleDrawerNav( event ) {
		event.preventDefault();
    if ( toggleDrawerNav_running ) {return}
    toggleDrawerNav_running = true;
    
    page_classes.toggle(drawer-nav-open) ; 
    setTimeout(function(){
      toggleDrawerNav_running = false; } , 500); }

    window.watchResize(function(){
var current_MQ = window.getActiveMQ();
		if ( current_MQ == 'small' &&
			 ! page_classes.contains( drawer_enabled_class ) )
		{
			page_classes.add( drawer_enabled_class );
			$menu_opener.addEventListener( 'click', toggleDrawerNav, false );
			$menu_opener.addEventListener( 'touchdown', toggleDrawerNav, false );
			$menu_closer.addEventListener( 'click', toggleDrawerNav, false );
			$menu_closer.addEventListener( 'touchdown', toggleDrawerNav, false );
		}
		else if ( current_MQ != 'small' &&
		          page_classes.contains( drawer_enabled_class ) )
		{
			page_classes.remove( drawer_enabled_class );
			$menu_opener.removeEventListener( 'click', toggleDrawerNav, false );
			$menu_opener.removeEventListener( 'touchdown', toggleDrawerNav, false );
			$menu_closer.removeEventListener( 'click', toggleDrawerNav, false );
			$menu_closer.removeEventListener( 'touchdown', toggleDrawerNav, false );
		}

	});
}(this));

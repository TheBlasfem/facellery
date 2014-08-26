(function(jQuery, undefined) {
			jQuery(document).ready(function() {


				$("#facellery").css("width","100%");
				$("#facellery img").css({"width":"20%","float":"left","padding":"5px"});

				var blqcopia = $("#facellery").clone();

				var blqreplace = blqcopia.children();

				$(blqreplace,"img").each(function(){$(this).attr("style","")});

				var blqreplacenew = $(blqreplace,"img").addClass("img_slide").addClass("slide");

				var lengthtotal=$("#facellery img").size();

				var bgbody = $("body").css("background");

				$("body").append('<div id="opacityfacellery"></div><section id="facellerywrap"><div style="display:none;" class="img_slides_wrap slides_wrap wrap"></div></section>');

				$(".img_slides_wrap").append(blqreplacenew);

				$(".img_slides_wrap").append('<div class="flecleft"></div><div class="flecright"></div><div class="facellerytitle"></div>');



					var wrap = jQuery('.slides_wrap'),
				    slides = wrap.find('.img_slide'),
				    active = slides.filter('.active'),
				    i = slides.index(active),
				    width = wrap.width();
				    var heightscreen = $(window).height();

				    $(".img_slides_wrap").css("height",heightscreen);



				$("#facellery img").click(function(){
					var pos = $(this).index();
					$(".img_slides_wrap img").eq(pos).addClass("active");
					$("#facellerywrap").addClass("display");
					$("#facellerywrap").show();
					$("#facellery").hide();
					$("#opacityfacellery").css("background","black");

					$(document).scrollTop(0);


					i = $(".img_slides_wrap img.active").index();

					
					
					

					var titulo = $(".img_slides_wrap img").eq(pos).data("title");

					

					if (titulo!=undefined){
						 	$(".facellerytitle").removeClass("disabled").html(titulo);
						 }
						 else{

						 	$(".facellerytitle").addClass("disabled");
						 }


					
					$(".img_slides_wrap").show();
					if (pos==0){
						$(".flecleft").addClass("disabled");
					}
					else if(pos==lengthtotal-1){
						$(".flecright").addClass("disabled");
					}
					responsivear();
				});

				

				var moveimgleft = function(){
					if ($(".img_slides_wrap img").hasClass("active")){
						 var posactive = $(".img_slides_wrap img.active").index();

						 var titulo = $(".img_slides_wrap img").eq(posactive-1).data("title");
						
						 if (posactive>0){
						$(".img_slides_wrap img.active").removeClass("active").prev().addClass("active");
							if (titulo!=undefined){
								var heightimgactive = $(".img_slides_wrap img.active").height();
								var heightpos = heightscreen/2 + heightimgactive/2;
								var bottomtitle = heightscreen - heightpos;
								$(".facellerytitle").css("bottom",bottomtitle);
							 	$(".facellerytitle").removeClass("disabled").html(titulo);
							 }
							 else{

							 	$(".facellerytitle").addClass("disabled");
							 }
						}

						if (posactive<=1){
							$(".flecleft").addClass("disabled");
						}
						else{
							$(".flecleft,.flecright").removeClass("disabled");
						}

							i = $(".img_slides_wrap img.active").index();
						
					}

				}



				var moveimgright = function(){

					if ($(".img_slides_wrap img").hasClass("active")){
						 var posactive = $(".img_slides_wrap img.active").index();

						 var titulo = $(".img_slides_wrap img").eq(posactive+1).data("title");


						if (posactive<lengthtotal-1){
						$(".img_slides_wrap img.active").removeClass("active").next().addClass("active");
							 if (titulo!=undefined){
							 	 var heightimgactive = $(".img_slides_wrap img.active").height();
								var heightpos = heightscreen/2 + heightimgactive/2;
								var bottomtitle = heightscreen - heightpos;
								$(".facellerytitle").css("bottom",bottomtitle);

							 	$(".facellerytitle").removeClass("disabled").html(titulo);
							 }
							 else{
							 	$(".facellerytitle").addClass("disabled");
							 }
						
						}
						if (posactive>=lengthtotal-2){
							$(".flecright").addClass("disabled");
						}
						else {
							$(".flecright,.flecleft").removeClass("disabled");
						}

							i = $(".img_slides_wrap img.active").index();
					}

				}

				$("body").keydown(function(e) {
				  if(e.keyCode == 37) { // left
				   moveimgleft();
				  }
				  else if(e.keyCode == 39) { // right
				   moveimgright();
				  }
				});

				$(".flecleft").click(function(){
					moveimgleft();
				});

				$(".flecright").click(function(){
					moveimgright();
				});


				//cerrar por click fuera
				$("body,#facellery,.img_slides_wrap").click(function(){
					if ($("#facellerywrap").hasClass("display")){
						$("#facellerywrap").hide();
						$("#facellerywrap").removeClass("display");
						$(".img_slides_wrap img").removeClass("active");
						$("#opacityfacellery").css("background","none").css("height","0");
						$("#facellery").show();
						$(".flecleft,.flecright").removeClass("disabled");
					}
				});

				$("#facellery img,.img_slides_wrap img,.flecleft,.flecright,.facellerytitle").click(function(e){
					
					
						e.stopPropagation();
					
				});



			


				//centrar por altura

				

				var responsivear=function(){

					heightscreen = $(window).height();

					var heightdocument = $(document).height();

					if($("#facellerywrap").hasClass("display")){
						$("#opacityfacellery").css("height",heightdocument);
					}

					var heightimgactive = $(".img_slides_wrap img.active").height();

					var heightpos = heightscreen/2 + heightimgactive/2;

					var bottomtitle = heightscreen - heightpos;

					$(".facellerytitle").css("bottom",bottomtitle);

					$(".img_slides_wrap img").each(function(){
					var heightimg = $(this).height();
					//var widthimg = $(this).width();
					
					//diffwidth = widthscreen/2 - widthimg/2;
					

					if (heightimg>heightscreen){
						$(this).css({"top" : "0"});
					}
					else {
						diffheight = heightscreen/2 - heightimg/2;
						$(this).css({"top" : diffheight});
					}



					});
				}

				

				$(window).on("resize",function(){
					responsivear();
				})




				// Listen for swipe events on slides, and use a custom 'activate'
				// event to add and remove the class 'active' to the previous
				// or next slide, and to keep the index up-to-date. The class
				// 'active' uses CSS transitions to make the slide move.

				slides

				.on('swipeleft', function(e) {
					if (i === slides.length - 1) { return; }
					else {
						slides.eq(i + 1).trigger('activate');

					}

				})

				.on('swiperight', function(e) {
				
					if (i === 0) { return; }
					else{
						slides.eq(i - 1).trigger('activate');
					}
					
				})

				.on('activate', function(e) {
					slides.removeClass('active');

					jQuery(e.target).addClass('active');

						var posactive = $(".img_slides_wrap img.active").index();

						 var titulo = $(".img_slides_wrap img").eq(posactive).data("title");

						var heightimgactive = $(".img_slides_wrap img.active").height();
						var heightpos = heightscreen/2 + heightimgactive/2;
						var bottomtitle = heightscreen - heightpos;
						$(".facellerytitle").css("bottom",bottomtitle);
						$(".facellerytitle").html(titulo);
						

						if (posactive==lengthtotal-1){
							$(".flecright").addClass("disabled");
						}
						else if (posactive==0){
							$(".flecleft").addClass("disabled");
						}
						else {
							$(".flecright,.flecleft").removeClass("disabled");
						}

					// Update the active slide index
					i = slides.index(e.target);
					//i=posactive;
				})

				// The code below handles what happens before any swipe event is triggered.
				// It makes the slides demo on this page work nicely, but really doesn't
				// have much to do with demonstrating the swipe events themselves. For more
				// on move events see:
				//
				// http://stephband.info/jquery.event.move

				.on('movestart', function(e) {
					// If the movestart heads off in a upwards or downwards
					// direction, prevent it so that the browser scrolls normally.
					if ((e.distX > e.distY && e.distX < -e.distY) ||
					    (e.distX < e.distY && e.distX > -e.distY)) {
						e.preventDefault();
						return;
					}

					// To allow the slide to keep step with the finger,
					// temporarily disable transitions.
					wrap.addClass('notransition');
				})

				.on('move', function(e) {
					var left = 100 * e.distX / width;

					// Move slides with the finger
					if (e.distX < 0) {
						if (slides[i+1]) {
							$(slides[i]).css("left",left + '%');
							$(slides[i+1]).css("left",(left+100) + '%');
						}
						else {
							$(slides[i]).css("left",left /4+ '%');
						}
					}
					if (e.distX > 0) {
						if (slides[i-1]) {
							$(slides[i]).css("left",left + '%');
							$(slides[i-1]).css("left",(left-100) + '%');
						}
						else {
							$(slides[i]).css("left",left /5+ '%');
						}
					}
				})

				.on('moveend', function(e) {
					wrap.removeClass('notransition');
					
					$(slides[i]).css("left","");
		
					if (slides[i+1]) {
						$(slides[i+1]).css("left","");
					}
					if (slides[i-1]) {
						$(slides[i-1]).css("left","");
					}
				});

				// Make the buttons work, too. Hijack the id stored in the href and use
				// it to activate the slide.

				jQuery(document)
				.on('click', '.slide_button', function(e) {
					var href = e.currentTarget.hash;

					jQuery(href).trigger('activate');

					e.preventDefault();
				});
			});
		})(jQuery);	
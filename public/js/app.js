let searching = false;

function scrape() {
	console.log(searching);
	// if ( searching ) return;
	
	searching = true;
	$('.fa-spinner').removeClass('hide');
	$('#images').empty();

	const search = $('#search').val().trim();	

	$.post('/scrape', {search})
		.then(images => {
			$('.fa-spinner').addClass('hide');
			
			images.forEach(url => {
				$('#images').append(`
					<div class="image" style="background-image: url(${url});"></div>
				`);
				// $('#images').append(`
				// 	<img src="${url}">
				// `);
			});

			$('#search').val('');
			searching = false;
			// $.each(images, (index, src) => {

			// });
		});
}

$('#scrape').on('click', scrape);
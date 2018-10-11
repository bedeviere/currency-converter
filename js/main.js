$(document).ready(function() {
	var base;
	var date;
	var curName = [];
	var curValue = [];

	$.ajax({ 
        type: 'GET', 
        url: 'https://api.exchangeratesapi.io/latest?base=USD', 
        dataType: 'json',
        success: function (data) { 
			curBase = data.base;
			curDate = new Date();
			$.each(data.rates, function(i, val) {
				curName.push(i);
				curValue.push(val);
			});

			$('.currency-base').text(curBase);
			$('.currency-date').text(curDate);

			for (var i = 0; i < curName.length; i++) {
				$('.currency-select').append('<option>' + curName[i] + '</option>')
			}

			$('.currency-more').click(function() {
				var curBefore = $('.currency-before').val();
				var curSelect = $('.currency-select').val();
				var curID = $.inArray(curSelect, curName);
				var curSum = parseInt(curBefore * parseFloat(curValue[curID]));
				var curSumFlag = curSum.toString().replace(/(\s)/g, '');
				curSum = curSumFlag.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

				$('ul.currency-list').append('<li><div class="form-group"><label>' + curName[curID] + '</label><div class="row"><div class="col-sm-9"><input type="text" class="form-control currency-sum" readonly="readonly" value=' + curSum + '></div><div class="col-sm-3"><button class="btn btn-danger currency-close">X</button></div></div><small class="form-text text-muted">1 USD = ' + curName[curID] + ' <span class="currency-value">' + curValue[curID] + '</span></small></div></li>');
			});

			$('.currency-before').on('keyup', function() {
				var curBefore = $(this).val();
				$('ul.currency-list > li').each(function() {
					var curValueThis = parseFloat($(this).find('.currency-value').text());
					var curSum = curBefore * curValueThis;

					$(this).find('.currency-sum').val(parseInt(curSum));

					var num = $(this).find('.currency-sum').val().replace(/(\s)/g, '');
					$(this).find('.currency-sum').val(num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
				});
			});

			$('ul.currency-list').on('click', '.currency-close' ,function() {
				$(this).closest('li').remove();
			});
        }
    });
});
(function() {
  
	var app = {
		
		initialize : function () {			
			this.modules();
			this.setUpListeners();
		},
 
		modules: function () {
 
		},
 
		setUpListeners: function () {
			$('form').on('submit', app.submitForm);
			$('form').on('keydown', 'input', app.removeError);
		},
 
		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),
				submitBtn = form.find('button[type="submit"]');	

			if(app.validateForm(form) === false) return false;

			submitBtn.attr('disabled', 'disabled');

			var str = form.serialize();

			$.ajax({
				url: 'send-msg.php',
				type: 'POST',
				data: str
			})
			.done(function(msg) {
				if(msg === 'OK'){
					var result = 'Спасибо за заявку! Мы свяжемся с вами в ближайшее время.';
					form.find('#success').html(result);
				}else{
					form.find('#success').html(msg);
				}
			})
			.always(function(msg) {
				submitBtn.removeAttr('disabled');
			})
		},

		validateForm: function (form) {
			var inputs = form.find('input.require'),
				valid = true;

			inputs.tooltip('destroy');

			$.each(inputs, function(indev, val) {
				var input = $(val),
					val = input.val(),
					formGroup = input.parents('.form-group'),
					label = input.attr('placeholder'),
					textError = 'Заполните обязательное поле!';

				if(val.length === 0){
					formGroup.addClass('has-error').removeClass('has-success');
					input.tooltip({
						trigger: 'manual',
						placement: 'top',
						title: textError
					}).tooltip('show');
					valid = false;
				}else{
					formGroup.addClass('has-success').removeClass('has-error');
				}
			});

			return valid;
		},

		removeError: function () {
			$(this).tooltip('destroy').parents('.form-group').removeClass('has-error');
		}
	}
 
	app.initialize();

}());
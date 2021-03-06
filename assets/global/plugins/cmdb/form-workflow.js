var FormWizard = function () {


    return {
        //main function to initiate the module
        init: function () {
            if (!jQuery().bootstrapWizard) {
                return;
            }


            var form = $('#submit_form');
            var error = $('.alert-danger', form);
            var success = $('.alert-success', form);

			jQuery.extend(jQuery.validator.messages, {
						  maxlength: jQuery.validator.format("请输入一个长度最多 {0} 个字，请重新输入"),	 
						  minlength: jQuery.validator.format("请输入一个长度最少 {0} 个字，请重新输入"), 
						  digits: "只能输入整数，请重新输入", 
						  dateISO: "请输入合法的日期，类似2014/2/21，请重新输入",
						  required: "请输入具体内容",
						  url:"请输入正确的网址, 例如http://abc.bc.youth.cn",
                          email:"请输入正确的邮箱地址"
						  });	
			
            form.validate({
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {

                    todo_build_user_departments: {
					    required: true
					},

					todo_build_user_mail: {
					    required: true,
                        email:true
					},

                    todo_build_user: {
                        minlength: 2,
						maxlength: 4,
                        required: true
                    },

                    ad_user: {
                        required: true
                    },

                    ip: {
                        required: true,
                        minlength: 7,
						maxlength: 15
                    },

                    old_site: {
						digits: true,
                        minlength: 1,
						maxlength: 3,
                        required: true
                    },

                    old_phonenum: {
						digits: true,
                        minlength: 4,
						maxlength: 4,
                        required: true
                    },

                    new_site: {
						digits: true,
                        minlength: 1,
						maxlength: 3,
                        required: true
                    },

                    vpn_user: {
                        required: true
                    },


                    bind_name: {
                        required: true
                    },

                    bind_ip: {
                        required: true
                    },

                    refresh_url: {
                        required: true,
                        url: true
                    },

                    todo_url: {
                        required: true
                    },

                    todo_jiasule_url: {
                        required: true
                    },

                    app_url: {
                        required: true
                    },

                    app_svn: {
                        required: true
                    },

                    app_svn_en: {
                        required: true
                    },

                    app_svn_cn: {
                        required: true
                    },

                    sql_dbname: {
                        required: true
                    },

                    raw_sql: {
                        required: true
                    },

                    todo_type: {
                        required: true
                    },

                    todo_user_id: {
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    'payment[]': {
                        required: "Please select at least one option",
                        minlength: jQuery.validator.format("Please select at least one option")
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
                        error.insertAfter("#form_gender_error");
                    } else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
                        error.insertAfter("#form_payment_error");
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit   
                    success.hide();
                    error.show();
                    Metronic.scrollTo(error, -200);
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
                        label
                            .closest('.form-group').removeClass('has-error').addClass('has-success');
                        label.remove(); // remove error label here
                    } else { // display success icon for other inputs
                        label
                            .addClass('valid') // mark the current input as valid and display OK icon
                        .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                    }
                },

                submitHandler: function (form) {
                    success.show();
                    error.hide();
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                }

            });

            var displayConfirm = function() {
                $('#tab4 .form-control-static', form).each(function(){
                    var input = $('[name="'+$(this).attr("data-display")+'"]', form);
                    if (input.is(":radio")) {
                        input = $('[name="'+$(this).attr("data-display")+'"]:checked', form);
                    }
                    if (input.is(":text") || input.is("textarea")) {
                        $(this).html(input.val());
                    } else if (input.is("select")) {
                        $(this).html(input.find('option:selected').text());
                    } else if (input.is(":radio") && input.is(":checked")) {
                        $(this).html(input.attr("data-title"));
                    } else if ($(this).attr("data-display") == 'payment[]') {
                        var payment = [];
                        $('[name="payment[]"]:checked', form).each(function(){ 
                            payment.push($(this).attr('data-title'));
                        });
                        $(this).html(payment.join("<br>"));
                    }
                });
            }

            var handleTitle = function(tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                $('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);
                // set done steps
                jQuery('li', $('#form_wizard_1')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }

                if (current == 1) {
                    $('#form_wizard_1').find('.button-previous').hide();
                } else {
                    $('#form_wizard_1').find('.button-previous').show();
                }

                if (current >= total) {
                    $('#form_wizard_1').find('.button-next').hide();
                    $('#form_wizard_1').find('.button-submit').show();
                    displayConfirm();
                } else {
                    $('#form_wizard_1').find('.button-next').show();
                    $('#form_wizard_1').find('.button-submit').hide();
                }
                Metronic.scrollTo($('.page-title'));
            }

            // default form wizard
            $('#form_wizard_1').bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function (tab, navigation, index, clickedIndex) {
                    return false;
                    /*
                    success.hide();
                    error.hide();
                    if (form.valid() == false) {
                        return false;
                    }
                    handleTitle(tab, navigation, clickedIndex);
                    */
                },
                onNext: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    if (form.valid() == false) {
                        return false;
                    }

                    handleTitle(tab, navigation, index);
                },
                onPrevious: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    handleTitle(tab, navigation, index);
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    $('#form_wizard_1').find('.progress-bar').css({
                        width: $percent + '%'
                    });
                }
            });

            $('#form_wizard_1').find('.button-previous').hide();
            $('#form_wizard_1 .button-submit').click(function () {
       		$(this).attr("disabled","disabled");
			$(this).button('loading');	   
				$.ajax({
					type: "POST",
					data: $('#submit_form').serialize(),
					cache: false,
                    dataType: "json",
                    beforeSend:function(){
                        Metronic.blockUI({animate: true});
                    },
                    complete: function() {
                        Metronic.unblockUI();
                    },
					success: function(obj) {
                      if (obj['status'] == "1"){
                          alert('工单添加成功');
                          var user= $('#todo_build_user').val();
						  window.location.href="../todoworkflowsearch/?search="+user;
                      }else{
                          alert('工单添加失败,请重新添加');
                          window.location.href="../todoworkflowtype/";
                      }

					}
				});
            }).hide();
        }

    };

}();
//注册信息判断
function InputCheck(RegForm) {
	reg = /^[\w\x80-\xff]{3,15}$/;
	Reg2 = /^(\w){6,20}$/;
	if(RegForm.username.value == "") {
		alert("用户名不可为空!");
		RegForm.username.focus();
		return(false);
	} else if(!reg.test(RegForm.username.value)) {
		alert("用户名格式不正确")
		return(false);
	}
	if(RegForm.password.value == "") {
		alert("必须设定登录密码!");
		RegForm.password.focus();
		return(false);
	} else if(!Reg2.test(RegForm.password.value)) {
		RegForm.password.focus();
		alert("密码不符合规定")
		return(false);
	}
	if(RegForm.repass.value != RegForm.password.value) {
		alert("两次密码不一致!");
		RegForm.repass.focus();
		return(false);
	}
	if(RegForm.email.value == "") {
		alert("电子邮箱不可为空!");
		RegForm.email.focus();
		return(false);
	}
}
//登录验证
function InputCheck1(LoginForm) {
	if(LoginForm.username.value == "") {
		alert("请输入用户名!");
		LoginForm.username.focus();
		return(false);
	}
	if(LoginForm.password.value == "") {
		alert("请输入密码!");
		LoginForm.password.focus();
		return(false);
	}
}
$('.login-submit').on('click', function() {
	var username = $('#username').val();
	var password = $('#password').val();
	$.ajax({
		type: "POST",
		url: "login.php",
		dataType: "json",
		data: {
			"user": username,
			"pass": password
		},
		beforeSend: function() {
			$('<div id="msg" />').addClass("loading").html("正在登录...").css("color", "#999").appendTo('.sub');
		},
		success: function(json) {
			if(json.success == 1) {
				var div = "<div id='result'><p><strong>" + json.user + "</strong>，恭喜您登录成功！</p>"
				$(".navbar-right").append(div);
			} else {
				$("#msg").remove();
				$('<div id="errmsg" />').html(json.msg).css("color", "#999").appendTo('.login-submit')
					.fadeOut(2000);
				return false;
			}
		}
	});
});
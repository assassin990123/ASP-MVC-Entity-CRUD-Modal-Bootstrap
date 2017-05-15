$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});

function RenderActions(RenderActionstring) {
    $("#OpenDialog").load(RenderActionstring);
};

function CreateNew() {
    if (!ValidateInputs())
        return;

    $.ajax({
        url: '/MyEntities/Create/',
        type: 'POST',
        data: $('form').serialize(),
        success: function (response) {
            Clean();
            $('#btnCloseModal').click();
            var raw = '';
            raw += "<tr id=" + response.Id + '>';
            raw += "<td>" + response.Id + "</td>";
            raw += "<td>" + response.FirstName + "</td>";
            raw += "<td>" + response.SecondName + "</td>";
            raw += "<td>" + response.PhoneNumber + "</td>";
            raw += "<td>" + response.Email + "</td>";
            raw += "<td>" + "<button class = \"btn btn-sm btn-primary\" data-toggle=\"modal\" data-target=\"#modalCreate\" onclick=\"RenderActions('/MyEntities/Edit/' + " + response.Id + ")\">Edit</button> | " +
                "<button class = \"btn btn-sm btn-danger\" data-toggle=\"modal\" data-target=\"#modalCreate\" onclick=\"RenderActions('/MyEntities/Delete/' + " + response.Id + ")\">Delete</button></td>";
            raw += "</tr>";
            $('#indexTbody').append(raw);
        },
        error: function (err) { alert("Error: " + err.responseText); }
    })
};

function DeleteEmp(id) {
    document.getElementById(id).remove();
    $.ajax({
        url: '/MyEntities/Delete/' + id,
        data: $('form').serialize(),
        type: 'POST',
        success: function () { $('#btnCloseModal').click(); },
        error: function (err) { alert("Error: " + err.responseText); }
    });
};

function EditEmp(id) {
    if (!ValidateInputs())
        return;
    $.ajax({
        url: '/MyEntities/Edit/' + id,
        type: 'POST',
        data: $('form').serialize(),
        success: function (res) {
            var keys = ["Id", "FirstName", "SecondName", "PhoneNumber", "Email"];
            $('#' + res.Id + ' td').each(function (i) {
                $(this).text(res[keys[i]]);
            });
            $('#btnCloseModal').click();
        },
        error: function (err) { alert("Error: " + err.responseText); }
    })
};

function Clean() {
    $('#modalCreate').find('textarea,input').val('');
};

function ValidateInputs() {
    var flag = true;
    var firstNameInput = $('#FirstName');
    var secondNameInput = $('#SecondName');
    var emailInput = $('#Email');

    if ($.trim(firstNameInput.val()) != '') {
        firstNameInput.closest('.form-group').removeClass('has-error');
        flag = true;
    }

    if ($.trim(secondNameInput.val()) != '') {
        secondNameInput.closest('.form-group').removeClass('has-error');
        flag = true;
    }

    if ($.trim(emailInput.val()) === '') {
        emailInput.closest('.form-group').removeClass('has-error');
        flag = true;
    }

    if ($.trim(firstNameInput.val()) === '') {
        firstNameInput.closest('.form-group').addClass('has-error');
        flag = false;
    }

    if ($.trim(secondNameInput.val()) === '') {
        secondNameInput.closest('.form-group').addClass('has-error');
        flag = false;
    }

    if ($.trim(emailInput.val()) != '') {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test($('#Email').val())) {
            emailInput.closest('.form-group').addClass('has-error');
            flag = false;
        }
    }

    return flag;
};
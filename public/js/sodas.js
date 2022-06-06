$(() => {
    getSodas()
    function getSodas() {
        $.ajax({
            type: "GET",
            url: "/api/allSodas",
            success: function (result) {
                if (result.length === 0) {
                    $('#sodaHeading').text("Ther are no sodas");
                }
                else {
                    $.each(result, function (i, sodas) {
                        let sodaName = $(`<a href='/' class='sodaNameLink'>${sodas.name} </a>`)
                        sodaName.attr('id', sodas._id)
                        sodaName.attr('value', i)
                        sodaName.attr('name', sodas.name)
                        sodaName.click(function (event) {
                            event.preventDefault()
                            getSingleSoda(sodas._id)
                            $('#sodaForm').hide()
                            $('#listOfSodas').hide()
                            $('#sodaHeading').text('Details')
                        })
                        $('#listOfSodas').show()
                        $('#listOfSodas').append(sodaName)
                    });
                }
            }
        })
    }
    function getSingleSoda(id) {
        $.ajax({
            type: "GET",
            url: "/api/allSodas/" + id,
            success: function (soda) {
                $('#sodaInfo').append(`<div>The name of the soda is: ${soda.name}</div><div>The fizziness rating is: ${soda.fizziness}</div>
            <div>The taste rating is: ${soda.tasteRating}</div>`)
                let deleteSodaButton = $(`<button class='deleteSoda'>Click Here to Delete this Soda. </button>`)
                $('#sodaInfo').append(deleteSodaButton)
                $(deleteSodaButton).on('click', function (event) {
                    event.preventDefault()
                    deleteSoda(id)
                })
            }
        })
        $('#selectAddSoda').hide()
    }
    $('#addSodaButton').on('click', (event) => {
        let myForm = $('#sodaForm')[0];
        if (!myForm.reportValidity || myForm.reportValidity()) {
        event.preventDefault()
        const newSoda = {
            name: $('#name').val(),
            fizziness: $('#fizziness').val(),
            tasteRating: $('#tasteRating').val()
        }
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/api/addSoda',
            data: JSON.stringify(newSoda),
            success: function () {
                let sodaNames = $(`<a href='' class='sodaNameLink'> ${newSoda.name}</a>`)
                $('#listOfSodas').append(sodaNames)
                window.location.reload()
            },
            dataType: 'json'
        })
    }
    else {
        $('#sodaForm').append(`<div class='formAlert'>A record of this soda was not made.</div>`)
    }
    })
    function deleteSoda(id) {
        $.ajax({
            type: "DELETE",
            url: `/api/deleteSoda/${id}`,
            data: JSON.stringify({ '_id': id }),
            contentType: 'application/json',
            dataType: 'json',
            success: function () {
                window.location.reload()
            }
        })
    }
})
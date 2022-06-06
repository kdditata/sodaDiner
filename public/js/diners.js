$(() => {
    getDiners()
    let newSoda = $(`<button id='addSodaToDiner'>Click here to add a soda to this diner.</button>`)
    function getDiners() {
        $.ajax({
            type: "GET",
            url: "/api/allDiners",
            success: function (result) {
                if (result.length === 0) {
                    $('#dinerHeading').text("There are no diners");
                }
                else {
                    $.each(result, function (i, diners) {
                        let dinerName = $(`<a href='' class='dinerNameLink'>${diners.name} </a>`)
                        dinerName.attr('id', diners._id)
                        dinerName.attr('value', i)
                        dinerName.attr('name', diners.name)
                        dinerName.click(function (event) {
                            event.preventDefault()
                            getSingleDiner(diners._id)
                            $('#sodaList').append(newSoda)
                            $('#dinerForm').hide()
                            $('#listOfDiners').hide()
                            $('#dinerHeading').text('Details')
                        })
                        $('#listOfDiners').show()
                        $('#listOfDiners').append(dinerName)
                    });
                }
            }
        })
    }
    function getSingleDiner(id) {
        $.ajax({
            type: "GET",
            url: "/api/allDiners/" + id,
            success: function (diner) {
                let availSodas = diner.sodas;
                availSodas.forEach(soda => {
                    showAvailSodas = {
                        name: soda.name,
                        fizziness: soda.fizziness,
                        tasteRating: soda.tasteRating,
                        id: soda._id
                    }
                    let sodasAvailLink = $(`<a href='' class='sodaLinks'>${showAvailSodas.name}</a></br>`)
                    sodasAvailLink.attr('id', 'dinerSodas')
                    $('#dinerInfo').append(sodasAvailLink)
                    $(sodasAvailLink).on('click', function (e) {
                        e.preventDefault()
                        stopSoda(id, soda._id)
                        sodasAvailLink.hide()
                        $('#stopServing').hide()
                        $('#dinerInfo').append(`<div class ='stopServing'>There are currently no sodas being served.</div>`)
                    })
                })
                $('#dinerInfo').prepend(`
                <div> The diner name is: ${diner.name}</div><div>The diner is located in: ${diner.location}</div><div id='sodaNamesList'>The diner is currently providing:</div>
                `)
                availSodas.length === 0 ? $('#sodaNamesList').append(`<div id='noSodas'class ='stopServing'>There are currently no sodas being served.</div>`) : $('#dinerInfo').append(`<div id='stopServing'>Click the link above to stop serving this soda.</div>`)
                $(newSoda).on('click', function (event) {
                    event.preventDefault()
                    $('#noSodas').hide()
                    findSoda(id)
                })
            }
        })
        $('#selectAddDiner').hide()
        let deleteDinerButton = $(`<button class='deleteDiner'>Click Here to Delete this Diner. </button>`)
        $('#back').prepend(deleteDinerButton)
        $(deleteDinerButton).on('click', function (event) {
            event.preventDefault()
            deleteDiner(id)
        })
    }
    $('#addDinerButton').on('click', (event) => {
        let myForm = $('#dinerForm')[0];
        if (!myForm.reportValidity || myForm.reportValidity()) {
            event.preventDefault()
            const newDiner = {
                name: $('#name').val(),
                location: $('#location').val()
            }
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/api/addDiner',
                data: JSON.stringify(newDiner),
                success: function () {
                    let dinerNames = $(`<a href='' class='dinerNameLink'> ${newDiner.name}</a>`)
                    $('#listOfDiners').append(dinerNames)
                    window.location.reload()
                },
                dataType: 'json'
            })
        }
        else {
            $('#dinerForm').append(`<div class='formAlert'>A record of this diner was not made.</div>`)
        }
    })
    function findSoda(id) {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: '/api/findSoda/' + id,
            success: function (result) {
                let message = `<p>The sodas available are:</p>`
                $('#sodaList').prepend(message)
                let arr = []
                for (let i = 0; i < result.length; i++) {
                    arr.push({
                        name: result[i].name,
                        fizziness: result[i].fizziness,
                        tasteRating: result[i].tasteRating,
                        id: result[i]._id
                    })
                }
                arr.forEach((element) => {
                    let sodaNameButton = $(`<button
                    class='sodaNames'>${element.name} </button>`)
                    sodaNameButton.attr('id', id)
                    let sodaId = element.id;
                    id = id;
                    $('#sodaList').append(sodaNameButton)
                    sodaNameButton.on('click', function (e) {
                        e.preventDefault();
                        addSodaToDiner(id, sodaId)
                        $('#dinerInfo').append(`<div id='thankYouMessage'>Thank you for adding ${element.name} to this diner! Who's thirsty?</div>`)
                        $('#sodaList').hide()
                    })
                })
            }
        })
        $(newSoda).hide()
    }
    function addSodaToDiner(id, sodaId) {
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: `/api/addSodaToDiner/${id}/${sodaId}`,
            data: JSON.stringify({ 'sodas': sodaId }),
            dataType: 'json'
        })
    }
    function stopSoda(id, sodaId) {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: `/api/stopSoda/${id}/${sodaId}`,
            dataType: 'json'
        })
    }
    function deleteDiner(id) {
        $.ajax({
            type: "DELETE",
            url: `/api/deleteDiner/${id}`,
            data: JSON.stringify({ '_id': id }),
            contentType: 'application/json',
            dataType: 'json',
            success: function () {
                window.location.reload()
            }
        })
    }
})


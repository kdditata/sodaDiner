$('#dinerForm').hide()
$('#selectAddDiner').on('click', function () {
    $('#dinerForm').show()
    $('#selectAddDiner').hide()
    $('#dinerHeading').text('New Diner')
})
$('#sodaForm').hide()
$('#selectAddSoda').on('click', function () {
    $('#sodaForm').show()
    $('#selectAddSoda').hide()
    $('#sodaHeading').text('New Soda')
})
$('#goBack').on('click', function () {
    window.location.reload()
})
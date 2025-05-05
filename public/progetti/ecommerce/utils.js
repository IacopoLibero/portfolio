function clearFormAndAllert(id, modalToTrigger){
    var myModal = new bootstrap.Modal(document.getElementById(modalToTrigger), {}).show();
    document.getElementById(id).reset();
}
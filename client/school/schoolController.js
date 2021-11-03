const getSchoolById = async id =>{
    return await $.ajax({
        type: 'GET',
        url : 'http://localhost/institute/institute/public/index.php/school/' + id
    }).done(res => res);
};

const getId = async id => {
    document.getElementById("id_delete").value = id;
    console.log(id_delete);
    console.log(document.getElementById("id_delete").value);
};

const getInfo = async id =>{
   let school = await getSchoolById(id);
   var dateCreated = new Date(school.school[0].created.date).toLocaleString();
    // let dateUpdated = new Date(school.school[0].updated.date).toLocaleString();

   if (school.school[0].updated == null){
        var dateUpdated = "No hay fecha de actualización";
   }else{
        var dateUpdated = new Date(school.school[0].updated.date).toLocaleString();
   };
    
   document.getElementById('name').value = school.school[0].name;
   document.getElementById('street').value = school.school[0].street;
   document.getElementById('created').value = dateCreated;
   document.getElementById('updated').value = dateUpdated;
   document.getElementById('status').value = school.school[0].status ? "Activo" : "Inactivo";
   console.log(school);
};
const getInfoUpdate = async id =>{
    let school = await getSchoolById(id);
    let dateCreated = new Date(school.school[0].created.date).toLocaleString();
    // let dateUpdated = new Date(school.school[0].updated.date).toLocaleString();
    if (school.school[0].updated == null){
        var dateUpdated = "No hay fecha de actualización";
    }else{
        var dateUpdated = new Date(school.school[0].updated.date).toLocaleString();
    };
    

    document.getElementById('id_update').value = id;
    document.getElementById('name_update').value = school.school[0].name;
    document.getElementById('street_update').value = school.school[0].street;
    document.getElementById('created_update').value = dateCreated;
    document.getElementById('updated_update').value = dateUpdated;
};
const getSchool = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost/institute/institute/public/index.php/school'
    }).done(res => {
        console.log(res.listSchool); 

        let listSchool = res.listSchool;
        let table = $("#tabla");
        table.append(
            "<tr class='table'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Name</th>" +
            "<th scope='col'>Street</th>" +
            "<th scope='col'>Created</th>" +
            "<th scope='col'>Updated</th>" +
            "<th scope='col'>Status</th>" +
            "<th scope='col'>Acciones</th>" +
            "</tr>")

        for (let i = 0; i < listSchool.length; i++) {
            var dateCreated = new Date(listSchool[i].created.date).toLocaleString();
            if (listSchool[i].updated == null){
                var dateUpdated = "Sin registro";
            }else{
                var dateUpdated = new Date(listSchool[i].updated.date).toLocaleString();
            }
            
            table.append(
                "<tr>" +
                "<td>" + listSchool[i].id + "</td>" +
                "<td>" + listSchool[i].name + "</td>" +
                "<td>" + listSchool[i].street + "</td>" +
                "<td>" + dateCreated + "</td>" +
                "<td>" + dateUpdated + "</td>" +
                "<td>" + listSchool[i].status + "</td>" +
                "<td>"+ '<button onclick="getInfo('+ listSchool[i].id +');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#details"> Detalles</button> </td>'+
                "<td>"+ '<button onclick="getInfoUpdate('+ listSchool[i].id +');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update"> Modificar</button> </td>'+
                "<td>"+ '<button onclick="getId('+ listSchool[i].id +');" type="button" class="btn btn-danger text-dark" data-bs-toggle="modal" data-bs-target="#delete2"> Eliminar</button> </td>'+
                "</tr>")
        }
    });
};

const registerSchool = async() =>{
    let name = document.getElementById('name_register').value;
    let street = document.getElementById('street_register').value;
    var date = Date.now();
    let created = document.getElementById(date);

    await $.ajax({
        type: 'POST',
        url: 'http://localhost/institute/institute/public/index.php/school/create' ,
        data: {name, street, created}
    }).done(function(res){
        console.log(res);
    });
};

const updateSchool = async () =>{
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let street = document.getElementById('street_update').value;
    // let updated = document.getElementById(now()).value;
    console.log(id);

    $.ajax({
        type: 'POST', 
        url: 'http://localhost/institute/institute/public/index.php/school/update/' + id,
        data:{name, street }
    }).done(function(res) {
        console.log(res);
    });
};

const deleteSchool = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'GET',
        url: 'http://localhost/institute/institute/public/index.php/school/delete/' + id
    }).done(res => {
        console.log(res);
        getSchool();
    });
};

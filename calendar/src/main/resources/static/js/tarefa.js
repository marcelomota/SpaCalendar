function pesquisarTarefas(){
    let titulo = $('#tituloBusca').val();
    if(titulo!= null && titulo.trim()!=''){
        $.ajax({
            method: "GET",
            url: "buscarPorTitulo",
            data: "titulo="+titulo,
            contentType:"application/json; charset-utf-8",
            success: function(response){
                $('#tabelaTarefas > tbody > tr').remove();
                if(response==""){
                    alert("Não há tarefas com o termo pesquisado");
                }else{
                for(let i=0; i<response.length; i++){
                    $('#tabelaTarefas > tbody').append('<tr id="'+response[i].id+'"><td>'+response[i].titulo+'</td><td>'+response[i].data+'</td><td>'+response[i].hora+'</td><td>'+response[i].duracao+'</td><td>'+response[i].descricao+'</td><td><button type="button" class="btn btn-warning" onclick="carregarTarefa('+response[i].id+')">Ver</button></td><td><button type="button" class="btn btn-danger" onclick="apagarTarefa('+response[i].id+')">Apagar</button></td></tr>');                    

                }
            }
            }
        }).fail(function (xhr, status, errorThrown){
            alert("Erro ao pesquisar as Tarefas: "+ xhr.responseText);
        });
    }
}

function apagarTarefa(id){
    if(confirm('Deseja realmente apagar a Tarefa?')){
    $.ajax({
        method: "DELETE",
        url: "deletarTarefa",
        data: "idTarefa="+ id,
        success: function(response){
            $('#'+id).remove();
            alert(response);
        }
    }).fail(function (xhr, status, errorThrown){
        alert("Erro ao deletar a Tarefa: "+ xhr.responseText);
    });

    }
}

function listarTodasTarefas(){
        $.ajax({
            method: "GET",
            url: "listaTodos",
            contentType:"application/json; charset-utf-8",
            success: function(response){
                $('#tabelaTarefas > tbody > tr').remove();
                if(response==""){
                    alert("Não há tarefas cadastradas");
                }else{
                for(let i=0; i<response.length; i++){
                    $('#tabelaTarefas > tbody').append('<tr id="'+response[i].id+'"><td>'+response[i].titulo+'</td><td>'+response[i].data+'</td><td>'+response[i].hora+'</td><td>'+response[i].duracao+'</td><td>'+response[i].descricao+'</td><td><button type="button" class="btn btn-warning" onclick="carregarTarefa('+response[i].id+')">Editar</button></td><td><button type="button" class="btn btn-danger" onclick="apagarTarefa('+response[i].id+')">Apagar</button></td></tr>');                    

                }
            }
            }
        }).fail(function (xhr, status, errorThrown){
            alert("Erro ao pesquisar as Tarefas: "+ xhr.responseText);
        });
    
}


function carregarTarefa(id){

    $.ajax({
        method: "GET",
        url: "buscarTarefa",
        data: "idTarefa="+id,
        contentType:"application/json; charset-utf-8",
        success: function(response){
            $("#data").val(response.data);
            $("#horaInicio").val(response.hora);
            $("#horaFim").val(returnDurationToHoraFim(response.hora,response.duracao));
            $("#titulo").val(response.titulo);
            $("#descricao").val(response.descricao);            

            $("#modalPesquisaTarefa").modal('hide');;
        }
    }).fail(function (xhr, status, errorThrown){
        alert("Erro ao buscar a Tarefa: "+ xhr.responseText);
    });

}




function salvarTarefa(){
    let data = $("#data").val();
    let horaInicio=$("#horaInicio").val();
    let horaFim=$("#horaFim").val();
    let titulo=$("#titulo").val();
    let descricao=$("#descricao").val();

    if(horaFim.toString()<horaInicio.toString()){
        alert("O horário de finalização da Tarefa não pode ser menor que o horário inicial");
        $('#horaFim').focus();
    } else if(empty(titulo, data,descricao,horaInicio,horaFim)){
        alert("Todos os campos precisam ser devidamente preenchidos");
    }
    else{
    $.ajax({
        method: "POST",
        url: "salvarTarefa",
        data: JSON.stringify({titulo: titulo, descricao: descricao, data: data, hora:horaInicio, duracao: duration(horaInicio,horaFim)}),
        contentType:"application/json; charset-utf-8",
        success: function(response){
            alert("Tarefa "+ response.titulo +" salva com sucesso!");
            $("#data").val("");
            $("#horaInicio").val("");
            $("#horaFim").val("");
            $("#titulo").val("");
            $("#descricao").val("");

        }
    }).fail(function (xhr, status, errorThrown){
        alert("Erro ao salvar a Tarefa: "+ xhr.responseText);
    });
    }
       
}


function duration(horaInicio, horaFim){
    let inicio = horaInicio.split(':');
    let fim = horaFim.split(':');
    let minutosInicio = (Number(inicio[0])*60)+Number(inicio[1]);
    let minutosFim = (Number(fim[0])*60)+Number(fim[1]);
    
    return (minutosFim-minutosInicio).toString()+' minutos';
    
}
function returnDurationToHoraFim(horaInicio, duracao){
    let inicio = horaInicio.split(':');
    let durac = duracao.split(' ');
    let horaFim = (Number(inicio[0])*60)+Number(inicio[1])+Number(durac[0]);
    return (Math.trunc(horaFim/60)).toString()+':'+(horaFim%60).toString().substring(0,2);
}

function empty(titulo,data,descricao,horaInicio,horaFim){
    if(titulo=="" || titulo!=null && titulo.trim()==''){
        $('#titulo').focus();
        return true;
    } else if( data=="" ){
        $('#data').focus();
        return true;
    } else if(descricao=="" || descricao!= null && descricao.trim()==''){
        $('#descricao').focus();
        return true;
    } else if(horaInicio==""){
        $('#horaInicio').focus();
        return true;
    } else if(horaFim== ""){
        $('#horaFim').focus();
        return true;
    }
    else {
        return false;
    }
}

function today(){
    let date = new Date();

    return date.getUTCFullYear()+'-'+date.getUTCMonth()+'-'+date.getUTCDate();
}
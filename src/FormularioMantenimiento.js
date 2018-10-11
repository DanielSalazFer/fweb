import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js';
import $ from 'jquery';
import Tabla from './Tabla';

class FormularioMantenimiento extends React.Component {

  constructor(){
    super();
  }

  

  componentDidMount(){
    this.iniciaDatePicker();
    this.clearForm();
  }

  render() {
    return (
      <form>
        <div class="form-group">
            <label for="personaId">Identificación</label>
            <input type="number" class="form-control" id="personaId" placeholder="Ejemplo: 111800478" />
          </div>
          <div class="form-group">
            <label for="personaNombre">Nombre</label>
            <input type="text" class="form-control" id="personaNombre" placeholder="Ejemplo: Allam Chaves" />
          </div>
          <div class="form-group">
            <label for="personaFecha">Fecha</label>
            <input type="text" class="form-control" id="personaFecha" value="2011-01-13" />
          </div>
          <button onClick={this.savePerson} type="button" class="btn btn-primary" id="save">Guardar</button>
      </form>
    );
  }
  
  iniciaDatePicker(){
    // $("#personaFecha").datepicker({
    //   dateFormat: "yy-mm-dd"
    // });
  }

  clearForm() {
    $("td.selected").removeClass('selected');
    $("#personaId").prop('disabled', false);
    $("#personaId").val("");
    $("#personaNombre").val("");
    $("#personaFecha").val("");
  }

  savePerson = () => {
    let arr = '{"id":"' + $("#personaId").val() + '","nombre":"' + $("#personaNombre").val() + '","fecha": "1996-08-18"'/* + $("#personaFecha").val()*/ + '}';
    let tabla = Tabla;
    $.ajax({
      async: true,
      url: "http://192.168.56.101/ejerciciophp/persona/create.php",
      type: "POST",
      data: arr,
      dataType: 'json',
      success: function (msg) {
        alert(JSON.stringify(msg))
        
      },

    });
  }
}

export default FormularioMantenimiento;

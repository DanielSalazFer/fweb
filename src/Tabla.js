import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js';
import $ from 'jquery';

class Tabla extends React.Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  cargarData() {
    $.ajax({
      url: 'http://192.168.56.101/ejerciciophp/persona/read.php',
      type: 'GET',
      dataType: 'json',
      ContentType: 'application/json',
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (jqXHR) {
        console.log(jqXHR);
      }.bind(this)
    })
  }

  clearForm() {
    $("td.selected").removeClass('selected');
    $("#personaId").prop('disabled', false);
    $("#personaId").val("");
    $("#personaNombre").val("");
    $("#personaFecha").val("");
  }

  
  componentDidMount() {
    this.cargarData();
    // $("#personaFecha").datepicker({
    //   dateFormat: "yy-mm-dd"
    // });
  }

  render() {
    return (
      <div class="container">
        <table class="table table-striped table-hover">
          <tbody>
            {this.state.data.map(function (item, key) {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.fecha}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
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
            <input type="text" class="form-control" id="personaFecha" placeholder="Ejemplo: 1996-08-18"/>
          </div>
          <button onClick={this.savePerson} type="button" class="btn btn-primary" id="save">Guardar</button>
        </form>
      </div>
    );
  }

  savePerson = () => {
    let arr = '{"id":"' + $("#personaId").val() + '","nombre":"' + $("#personaNombre").val() + '","fecha": "1996-08-18"'/* + $("#personaFecha").val()*/ + '}';
    let that = this;
    $.ajax({
      async: true,
      url: "http://192.168.56.101/ejerciciophp/persona/create.php",
      type: "POST",
      data: arr,
      dataType: 'json',
      success: function (msg) {
        alert(JSON.stringify(msg))
        that.cargarData();
        that.clearForm();
      },

    });
  }

}

export default Tabla;

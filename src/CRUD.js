import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Popper from 'popper.js';
import $ from 'jquery'; 



  class CRUD extends React.Component {
    constructor(props){
      super(props)
        this.state = {
          data: [],
          personaId : '',
          personaNombre : '',
          personaFecha: '',
          edit: true

        }
        
        this.handleChange = this.handleChange.bind(this)
        this.guardar = this.guardar.bind(this)
        this.cargaValores = this.cargaValores.bind(this)
        this.consultarPersona = this.consultarPersona.bind(this)
		this.borrar = this.borrar.bind(this)
		this.modificar = this.modificar.bind(this)
        
      
    }
    handleChange(event) {
      console.log(event.target.id)
      if (event.target.id == 'personaId')
          this.setState({personaId: event.target.value});
      if (event.target.id == 'personaNombre')
          this.setState({personaNombre: event.target.value});
      if (event.target.id == 'personaFecha')
          this.setState({personaFecha: event.target.value});
    }

    guardar(event) {
        
      var arr = '{"id":"'+this.state.personaId+'","nombre":"'+this.state.personaNombre+'","fecha":"'+this.state.personaFecha+'"}';
      $.ajax({
        async: true,
        url: "http://192.168.56.101/ejerciciophp/persona/create.php",
        type: "POST",
        data: arr,
        dataType: 'json',
        success: function(msg) {
                          alert(msg.message);
                          this.cargaValores();
						  //this.setState({personaId: arr.id, personaNombre: arr.nombre, personaFecha: arr.fecha, edit: false});
            
          }.bind(this)
      });
        
        event.preventDefault();
          
     
      
    }
	
	borrar(event) {
        
      var arr = '{"id":"'+this.state.personaId+'","nombre":"'+this.state.personaNombre+'","fecha":"'+this.state.personaFecha+'"}';
      $.ajax({
        async: true,
        url: "http://192.168.56.101/ejerciciophp/persona/delete.php?id=" + arr.id,
        type: "POST",
        data: arr,
        dataType: 'json',
        success: function(msg) {
                          alert(msg.message);
                          this.cargaValores();
						  //this.setState({personaId: arr.id, personaNombre: arr.nombre, personaFecha: arr.fecha, edit: false});
						  this.render();
						
						 
            
          }.bind(this)
      });
	
	
        event.preventDefault();
          
     
      
    }
	
		modificar(event) {
        
      var arr = '{"id":"'+this.state.personaId+'","nombre":"'+this.state.personaNombre+'","fecha":"'+this.state.personaFecha+'"}';
	  
      $.ajax({
        async: true,
        url: "http://192.168.56.101/ejerciciophp/persona/update.php",
        type: "POST",
        data: arr,
        dataType: 'json',
        success: function(msg) {
                          alert(msg.message);
						  
                          this.cargaValores();
						  //this.setState({personaId: arr.id, personaNombre: arr.nombre, personaFecha: arr.fecha, edit: false});
						  this.render();
						
						 
            
          }.bind(this)
      });
	
	
        event.preventDefault();
          
     
      
    }

    cargaValores (){
      $.ajax({
        url: "http://192.168.56.101/ejerciciophp/persona/read.php",
        type: "GET",
        dataType: 'json',
        ContentType: 'application/json',
        success: function(data) {
          
          this.setState({data: data});
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);
        }.bind(this)
     })
    }


    componentDidMount() {
      this.cargaValores();
    }
    consultarPersona (e){
		
      //alert (e.currentTarget.attributes['data-key'].value);
	  //alert (e.currentTarget.attributes['data-key'].value);
	    $.ajax({
        url: "http://192.168.56.101/ejerciciophp/persona/read_one.php?id=" + e.currentTarget.attributes['data-key'].value,
        type: "GET",
        dataType: 'json',
        ContentType: 'application/json',
        success: function(data) {

          
          this.setState({personaId: data.id, personaNombre: data.nombre, personaFecha: data.fecha, edit: false});
		 
		  
	  
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);
        }.bind(this)
     })


    }

    
    render() {
      

      return (
        <div>
        <table class="table table-striped table-hover">
        <tbody>{this.state.data.map(function(item, key) {
               
                 return (
                    <tr key = {key} data-key={item.id}  onClick={this.consultarPersona}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.fecha}</td>
                    </tr>
                  )}.bind(this)
               
               )}</tbody>
         </table>
         <form >
  	        <div class="form-group">
    	        <label for="personaId">Identificación</label>
		        <input type="number" class="form-control" id="personaId"  placeholder="Ejemplo: 111800478" value={this.state.personaId} onChange={this.handleChange}/>	
  	        </div>
  	        <div class="form-group">
    	        <label for="personaNombre">Nombre</label>
		        <input type="text" class="form-control" id="personaNombre"  placeholder="Ejemplo: Allam Chaves" value={this.state.personaNombre} onChange={this.handleChange}/>	
  	        </div>
  	
  	        <div class="form-group">
    	        <label for="personaFecha">Fecha</label>
		        <input type="text" class="form-control"   id="personaFecha"  value={this.state.personaFecha} onChange={this.handleChange}/>
  	        </div>
			<button type="button" class="btn btn-primary" id="update" hidden={this.state.edit} onClick={this.modificar}>Modificar</button>
  	        <button type="button" class="btn btn-primary" id="save" onClick={this.guardar}>Guardar</button>

            <button type="button" class="btn btn-danger" id="delete" hidden={this.state.edit} onClick={this.borrar}>Borrar</button>
            <button type="button" class="btn btn-secondary" id="cancel" hidden={this.state.edit} >Cancelar</button>
         </form>
         </div>
      )
    }
  }

 


  
export default CRUD;
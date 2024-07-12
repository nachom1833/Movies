package com.ar.movies;

public class UsuarioE {

    Long id_usuario;
    String nombre;
    String apellido;
    String email;
    String clave;

    public UsuarioE() {
       
    }
    public UsuarioE(Long id_usuario, String nombre, String apellido, String email, String clave) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.clave = clave;
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    @Override
    public String toString() {
        return "usuario [id_usuario=" + id_usuario + ", nombre=" + nombre + ", apellido=" + apellido + ", email="
                + email + ", clave=" + clave + "]";
    }

}

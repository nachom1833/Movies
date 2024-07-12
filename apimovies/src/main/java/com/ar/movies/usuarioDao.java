package com.ar.movies;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class usuarioDao {

    private ConexionDB conexion = new ConexionDB();

    private static final String getQuery = "SELECT * FROM usuario";
    private static final String insertQuery = "INSERT INTO usuario(id_usuario, nombre, apellido, email, clave) VALUES (?, ?, ?, ?, ?)";
    private static final String updateQuery = "UPDATE usuario SET nombre=?, apellido=?, email=?, clave=? WHERE id_usuario=?";
    private static final String deleteQuery = "DELETE FROM usuario WHERE id_usuario=?";
    private static final String getQueryById = "SELECT * FROM usuario WHERE id_usuario=?";
    private static final String getQueryByEmailClave = "SELECT * FROM usuario WHERE email=? AND clave=?";

    public Long insertUsuario(UsuarioE usuario) {
        Connection cn = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;

        try {
            cn = conexion.conectar();
            pstm = cn.prepareStatement(insertQuery, PreparedStatement.RETURN_GENERATED_KEYS);

            pstm.setLong(1, 0);
            pstm.setString(2, usuario.getNombre());
            pstm.setString(3, usuario.getApellido());
            pstm.setString(4, usuario.getEmail());
            pstm.setString(5, usuario.getClave());

            int result = pstm.executeUpdate();

            if (result > 0) {
                rs = pstm.getGeneratedKeys();
                if (rs.next()) {
                    System.out.println("Se ingreso de forma correcta al usuario");
                    return rs.getLong(1);
                } else {
                    System.out.println("Error al obtener el id del usuario ingresado");
                    return null;
                }
            } else {
                System.out.println("No se cargo el usuario");
            }
        } catch (SQLException e) {
            System.out.println("Error al insertar los datos");
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstm != null) pstm.close();
                if (cn != null) cn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public List<UsuarioE> getUsuarios() {
        List<UsuarioE> usuarios = new ArrayList<>();
        Connection cn = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;

        try {
            cn = conexion.conectar();
            pstm = cn.prepareStatement(getQuery);
            rs = pstm.executeQuery();

            while (rs.next()) {
                UsuarioE nextUsuario = new UsuarioE();
                nextUsuario.setId_usuario(rs.getLong("id_usuario"));
                nextUsuario.setNombre(rs.getString("nombre"));
                nextUsuario.setApellido(rs.getString("apellido"));
                nextUsuario.setEmail(rs.getString("email"));
                nextUsuario.setClave(rs.getString("clave"));

                usuarios.add(nextUsuario);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstm != null) pstm.close();
                if (cn != null) cn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return usuarios;
    }

    public UsuarioE existUsuario(UsuarioE usuario) {
        UsuarioE existUsuario = null;
        Connection cn = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;

        try {
            cn = conexion.conectar();
            pstm = cn.prepareStatement(getQueryByEmailClave);
            pstm.setString(1, usuario.getEmail());
            pstm.setString(2, usuario.getClave());

            rs = pstm.executeQuery();

            if (rs.next()) {
                existUsuario = new UsuarioE();
                existUsuario.setId_usuario(rs.getLong("id_usuario"));
                existUsuario.setNombre(rs.getString("nombre"));
                existUsuario.setApellido(rs.getString("apellido"));
                existUsuario.setEmail(rs.getString("email"));
                existUsuario.setClave(rs.getString("clave"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstm != null) pstm.close();
                if (cn != null) cn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return existUsuario;
    }

    public boolean deleteUsuario(Long id_usuario) {
        Connection cn = null;
        PreparedStatement pstm = null;
    
        try {
            cn = conexion.conectar();
            pstm = cn.prepareStatement(deleteQuery);
            pstm.setLong(1, id_usuario);
    
            int result = pstm.executeUpdate();
            return result > 0;
    
        } catch (SQLException e) {
            System.out.println("Error al eliminar el usuario");
            e.printStackTrace();
            return false;
        } finally {
            try {
                if (pstm != null) pstm.close();
                if (cn != null) cn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    
    public UsuarioE getUsuarioById(Long id_usuario) {
        UsuarioE usuario = null;
        Connection cn = null;
        PreparedStatement pstm = null;
        ResultSet rs = null;
    
        try {
            cn = conexion.conectar();
            pstm = cn.prepareStatement(getQueryById);
            pstm.setLong(1, id_usuario);
            rs = pstm.executeQuery();
    
            if (rs.next()) {
                usuario = new UsuarioE();
                usuario.setId_usuario(rs.getLong("id_usuario"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setApellido(rs.getString("apellido"));
                usuario.setEmail(rs.getString("email"));
                usuario.setClave(rs.getString("clave"));
            }
        } catch (SQLException e) {
            System.out.println("Error al obtener el usuario por ID");
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstm != null) pstm.close();
                if (cn != null) cn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    
        return usuario;
    }

    public boolean updateUsuario(UsuarioE usuario) {
        Connection cn = null;
        PreparedStatement pstm = null;
    
        try {
            cn = conexion.conectar();
            pstm = cn.prepareStatement(updateQuery);
    
            pstm.setString(1, usuario.getNombre());
            pstm.setString(2, usuario.getApellido());
            pstm.setString(3, usuario.getEmail());
            pstm.setString(4, usuario.getClave());
            pstm.setLong(5, usuario.getId_usuario());
    
            int result = pstm.executeUpdate();
            return result > 0;
    
        } catch (SQLException e) {
            System.out.println("Error al actualizar el usuario");
            e.printStackTrace();
            return false;
        } finally {
            try {
                if (pstm != null) pstm.close();
                if (cn != null) cn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    
}

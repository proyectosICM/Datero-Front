import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  BsFillPersonFill,
  BsPersonPlus,
  BsX,
} from "react-icons/bs";
import {
  HiOutlineIdentification,
  HiUserCircle,
} from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { rolesEstado } from "../../API/apiurls";

export function UsuariosModal({
  show,
  close,
  datosaeditar,
  editar,
  agregar,
  il,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    empresasModel: il,
    username: "",
    password: "",
    rolesModel: null,
    estado: true,
  });
  const [roles, setRoles] = useState([]);
  const [editando, setEditando] = useState(false);

  const ListarRoles = useCallback(async () => {
    const response = await axios.get(`${rolesEstado}/1`);
    setRoles(response.data);
  }, []);

  useEffect(() => {
    if (datosaeditar) {
      setFormData({ ...datosaeditar });
      setEditando(true);
    } else {
      // ...
    }
    ListarRoles();
  }, [datosaeditar, ListarRoles]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editando) {
      const updatedFormData = { ...formData };
      if (
        updatedFormData.rolesModel &&
        typeof updatedFormData.rolesModel === "object"
      ) {
        updatedFormData.rolesModel = updatedFormData.rolesModel.id;
      }
      editar(updatedFormData);
      limpiar();
    } else {
      agregar(formData);
    }
    close();
    limpiar();
  };
 
  const limpiar = () => {
    setFormData({
      nombre: "",
      apellido: "",
      dni: "",
      empresasModel: il,
      username: "",
      password: "",
      rolesModel: null,
      estado: true,
    });
    setEditando(false);
  };


  const handleClose = () => {
    if (datosaeditar) {
      limpiar();
    }
    close();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editando ? "Editar Trabajador" : "Agregar Trabajador"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="form-row">
              <Form.Group controlId="formNombre" className="form-group-half">
                <Form.Label>
                  <BsFillPersonFill className="label-icon" />
                  Nombre:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formApellido" className="form-group-half">
                <Form.Label>
                  <BsFillPersonFill className="label-icon" />
                  Apellido:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData({ ...formData, apellido: e.target.value })
                  }
                />
              </Form.Group>
            </div>

            <div className="form-row">
              <Form.Group controlId="formUsuario" className="form-group-half">
                <Form.Label>
                  <HiUserCircle className="label-icon" />
                  Usuario:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Usuario"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group
                controlId="formContrasena"
                className="form-group-half"
              >
                <Form.Label>
                  <MdOutlinePassword className="label-icon" />
                  Contraseña:
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Group>
            </div>

            <Form.Group controlId="formDNI">
              <Form.Label>
                <HiOutlineIdentification className="label-icon" />
                DNI:
              </Form.Label>
              <Form.Control
                type="text"
                name="dni_tra"
                placeholder="DNI"
                value={formData.dni}
                onChange={(e) =>
                  setFormData({ ...formData, dni: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formRol">
              <Form.Label>
                <BsPersonPlus className="label-icon" />
                Rol:
              </Form.Label>
              <Form.Select
                name="conductor"
                value={formData.rolesModel ? formData.rolesModel.id : ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setFormData({ ...formData, rolesModel: selectedId });
                }}
              >
                <option value="">
                  {formData.rolesModel
                    ? formData.rolesModel.nombre
                    : "Seleccione un rol"}
                </option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="modal-buttons">
              <Button type="submit">
                {editando ? "Guardar cambios" : "Crear"}
              </Button>
              <Button onClick={handleClose} variant='secondary'>
                <BsX className="button-icon" />
                Cerrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

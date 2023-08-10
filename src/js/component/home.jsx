import React, { useState, useEffect } from "react";
import ListaRender from "./listaRender";

const Home = () => {
  const [lista, setLista] = useState();
  const [nuevaLista, setNuevaLista] = useState("");

  useEffect(() => {
    leerDatos();
  }, []);
  const leerDatos = async () => {
    try {
      const API_URL =
        "https://playground.4geeks.com/apis/fake/todos/user/aajcs";
      const requestConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(API_URL, requestConfig);
      if (response.status != 200) {
        setLista([]);
        return;
      }
      const body = await response.json();
      setLista(body);
    } catch (error) {
      console.log(error);
    }
  };
  const crearDatos = async () => {
    try {
      const API_URL =
        "https://playground.4geeks.com/apis/fake/todos/user/aajcs";
      const requestConfig = {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(API_URL, requestConfig);
    } catch (error) {
      console.log(error);
    }
  };
  const actualizarLista = async (valor) => {
    if (lista.length === 0) {
      await crearDatos();
    }
    try {
      const API_URL =
        "https://playground.4geeks.com/apis/fake/todos/user/aajcs";
      const requestConfig = {
        method: "PUT",
        body: JSON.stringify(valor),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(API_URL, requestConfig);

      if (response.ok) {
        leerDatos();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const borrarTodaLista = async () => {
    try {
      const API_URL =
        "https://playground.4geeks.com/apis/fake/todos/user/aajcs";
      const requestConfig = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(API_URL, requestConfig);
      if (response.ok) {
        leerDatos();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const agregarLista = {
        label: nuevaLista,
        done: true,
      };
      actualizarLista([...lista, agregarLista]);
      setNuevaLista("");
    }
  };

  const deleteLista = (indexmap) => {
    let _lista = lista.filter((val, index) => index !== indexmap);
    if (lista.length === 1) {
      borrarTodaLista();
    } else {
      actualizarLista(_lista);
    }
  };
  return (
    <div className="container ">
      <h1 className="text-danger fw-lighter justify-content-center d-flex">
        TODOS
      </h1>
      <div className="card card-efecto">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            value={nuevaLista}
            onChange={(e) => setNuevaLista(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {lista ? (
          lista.length != 0 ? (
            lista.map((lista, index) => (
              <ListaRender
                lista={lista}
                deleteLista={deleteLista}
                key={index}
                index={index}
              />
            ))
          ) : (
            <h4 className="ms-5 py-2 m-0 fw-lighter">No hay tareas!!!</h4>
          )
        ) : (
          <h4 className="ms-5 py-2 m-0 fw-lighter">Cargando tareas!!!</h4>
        )}
        <div className="d-flex justify-content-between">
          <p className="fw-lighter m-0 p-2">{lista?.length} Item left</p>
          <button
            type="button"
            className="btn btn-outline-danger m-3"
            onClick={() => borrarTodaLista()}
          >
            Eliminar todas las listas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

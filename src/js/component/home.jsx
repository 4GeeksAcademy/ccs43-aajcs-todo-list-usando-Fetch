import React, { useState } from "react";
import ListaRender from "./listaRender";

//create your first component
const Home = () => {
  const inicialList = [
    {
      id: 1,
      contenido: "Make the bed",
    },
    {
      id: 2,
      contenido: "Wash my hands",
    },
    {
      id: 3,
      contenido: "Eat",
    },
    {
      id: 4,
      contenido: "Walk the dog",
    },
  ];
  const [lista, setLista] = useState(inicialList);
  const [nuevaLista, setNuevaLista] = useState("");
  console.log(lista);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Aquí puedes hacer lo que necesites con el valor actual del input
      console.log("Se presionó Enter con el siguiente valor:", nuevaLista);
      const agregarLista = {
        id: createId(),
        contenido: nuevaLista,
      };
      setLista([...lista, agregarLista]);
      setNuevaLista("");
    }
  };
  const createId = () => {
    let id = ''
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return id
  }
  const deleteLista = (indexmap) => {
    let _lista = lista.filter((val,index) => index !== indexmap);

    setLista(_lista);
  };
  return (
    <div className="container ">
      <h1 className="text-danger fw-lighter justify-content-center d-flex">TODOS</h1>
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
        {lista.length != 0 ?
          lista.map((lista,index) => (
            <ListaRender
              lista={lista}
              deleteLista={deleteLista}
              key={lista.id}
              index={index}
            />
          )):
          <h4 className="ms-5 py-2 m-0 fw-lighter">No hay tareas!!!</h4>
          }
        <p className="fw-lighter m-0 p-2">{lista.length} Item left</p>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";

//create your first component
const ListaRender = ({ lista, deleteLista }) => {
  const [visibleDelete, setVisibleDelete] = useState(false);

  return (
    <div
      className="border-top border-bottom m-0 d-flex justify-content-between"
      onMouseEnter={() => {
        setVisibleDelete(true);
      }}
      onMouseLeave={() => {
        setVisibleDelete(false);
      }}
    >
      <h4 className="ms-5 py-2 m-0 fw-lighter">{lista.contenido}</h4>
      {visibleDelete && (
        <span
          type="button"
          className=" text-danger me-5"
          onClick={() => deleteLista(lista.id)}
        >
          X
        </span>
      )}
    </div>
  );
};

export default ListaRender;

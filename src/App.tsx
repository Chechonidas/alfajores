import { futimes } from "fs";
import { stringify } from "querystring";
import React, { FormEvent, Fragment, useState, useRef } from "react";
import { formatDiagnostic } from "typescript";
import logo from "./logo.svg";

type FormElement = React.FormEvent<HTMLFormElement>;

interface IOrden {
  mesa: number;
  personas: number;
  comida: string;
  bebida: string;
  done: boolean;
}

interface ILogan {
  mesa: number;
  personas: number;
  comida: string;
  bebida: string;
  done: boolean;
}

function App(): JSX.Element {
  const [orden, setOrden] = useState<IOrden>({
    mesa: 0,
    personas: 0,
    comida: "",
    bebida: "",
    done: false,
  });
  const [ordenes, setOrdenes] = useState<IOrden[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  function actualizarOrden(e: FormElement) {
    e.preventDefault();
    guardarOrden(orden);
    setOrden(orden)
    console.log(ordenes);
  }

  function crearOrden(e: any) {
    const value = e.target.value;
    setOrden({
      ...orden,
      [e.target.name]: value,
      done: false,
    });
  }

  const guardarOrden = (orden: IOrden) => {
    const nuevaOrden: IOrden[] = [...ordenes, orden];
    setOrdenes(nuevaOrden);
  };

  const actualizarDone = (i: number) => {
    const nuevaOrden: IOrden[] = [...ordenes];
    nuevaOrden[i].done = !nuevaOrden[i].done;
    setOrdenes(nuevaOrden);
  };

  const eliminarOrden = (i: number) => {
    const orden: IOrden[] = [...ordenes];
    orden.splice(i, 1);
    setOrdenes(orden);
  };

  return (
    <Fragment>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
      </ul>
      <div className="row">
        <div className="col-3">
          <div className="card mt-5">
            <div className="card-body">
              <form onSubmit={actualizarOrden}>
                <label>
                  Mesa:
                  <input
                    className="form-control mt-2"
                    name="mesa"
                    type="number"
                    onChange={crearOrden}
                    value={orden.mesa}
                    ref={taskInput}
                    autoFocus
                  />
                </label>
                <label>
                  Personas:
                  <input
                    className="form-control mt-2"
                    name="personas"
                    type="number"
                    onChange={crearOrden}
                    value={orden.personas}
                  />
                </label>
                <label>
                  Comida:
                  <input
                    className="form-control mt-2"
                    name="comida"
                    type="text"
                    onChange={crearOrden}
                    value={orden.comida}
                  />
                </label>
                <label>
                  Bebida:
                  <input
                    className="form-control mt-2"
                    name="bebida"
                    type="text"
                    onChange={crearOrden}
                    value={orden.bebida}
                  />
                </label>
                <div className="form-group text-center mt-3">
                  <button className="btn btn-success ">Crear</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-9">
          {ordenes.map((o: IOrden, i: number) => (
            <div className="col-3 card card-body-mt-2" key={i}>
              <h1 style={{ textDecoration: o.done ? "line-through" : "" }}>
                Orden {i + ""}
              </h1>
              <h2>Mesa: {o.mesa}</h2>
              <h2>Personas: {o.personas}</h2>
              <h2>Comida: {o.comida}</h2>
              <h2>Bebida: {o.bebida}</h2>
              <button
                className="btn btn-secondary"
                onClick={() => actualizarDone(i)}
              >
                {o.done ? "✗" : "✓"}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => eliminarOrden(i)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default App;

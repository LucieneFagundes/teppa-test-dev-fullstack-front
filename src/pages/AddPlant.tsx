import { updateCurrentUser } from "@firebase/auth";
import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { createPlant, getPlant, updatePlant } from "../services/plants.service";

interface IPlant {
  id?: string;
  name: string;
  species?: string;
  notes?: string;
}

export default function AddPlant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [notes, setNotes] = useState("");
  const [ title , setTitle] = useState("");

  useEffect(() => {
    async function isUpdate() {
      if (id) {
        const plant = await getPlant(id);
        setPlant(plant);
        setName(plant.name);
        setSpecies(plant.species);
        setNotes(plant.notes);
        setTitle("Atualizar planta")
      }
    }
    isUpdate();
    setTitle("Adicionar planta")
  }, []);

  const initialValues: IPlant = {
    id: "",
    name,
    species,
    notes,
  };

  async function handleSubmit(data: IPlant) {
    data.name = name;
    data.species = species;
    data.notes = notes;

    if (!plant) {
      try {
        await createPlant(data);
        navigate("/");
      } catch (err) {}

    } else {
      data.id = id; 
      try {
        await updatePlant(data);
        navigate("/");
      } catch (error) {}
    }
  }

  return (
    <>
      <Layout title={title}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form action="#" method="POST">
            <div className="flex flex-row justify-around py-4 px-auto sm:flex-wrap">
              <div className="rounded-md space-y-2 w-full max-w-lg">
                <div>
                  <label htmlFor="name" className="">
                    Nome
                  </label>
                  <InputText
                    className="appearance-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Digite o nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="species" className="">
                    Espécie
                  </label>
                  <InputText
                    className="appearance-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Digite o nome"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="">
                    Anotações
                  </label>
                  <InputTextarea
                    className="appearance-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Digite o nome"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </Layout>
    </>
  );
}

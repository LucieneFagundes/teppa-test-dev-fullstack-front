import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { deletePlant, getAllPlants } from "../services/plants.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

interface IPlant {
  id: string;
  name: string;
  species: string;
  notes: string;
}

export default function Home() {
  const [plants, setPlants] = useState();
  const navigate = useNavigate();
  const toast = useRef(null);

  const columns = [
    { field: "name", header: "Nome" },
    { field: "species", header: "Espécie" },
    { field: "notes", header: "Anotações" },
  ];

  function handleCreate() {
    navigate("/add")
  }
  function handleUpdate(data: IPlant) {
    navigate(`/update/${data.id}`)
  }
  function handleDelete(data: IPlant) {
    confirmDialog({
      message: `Deseja apagar a planta "${data.name}"?`,
      header: "Confirmação de exclusão",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger p-button-sm",
      rejectClassName: "p-button p-button-sm",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: async () => {
        try {
          await deletePlant(data.id);
          toast.current.show({
            severity: "success",
            summary: "Confimado",
            detail: "Excluido com sucesso",
            life: 3000,
          });
          const plants = await getAllPlants();
          setPlants(plants);
        } catch (error) {
          toast.current.show({
            severity: "danger",
            summary: "Error",
            detail: "Erro ao excluir",
            life: 3000,
          });
        }
      },
    });
  }

  useEffect(() => {
    async function requestAllPlants() {
      const data = await getAllPlants();
      setPlants(data);
    }

    requestAllPlants();
  }, []);

  return (
    <Layout title="Minhas plantas">
        <div className="flex flex-row-reverse px-1 pb-3">
          <button
            className="group relative w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"           
            onClick={handleCreate}
          >Nova planta</button>
          {/* <Button
            icon="pi pi-plus"
            className="p-button-outlined p-button-rounded p-button-success"
            label="Adicionar planta"
            
            onClick={handleCreate}
          ></Button> */}
        </div>
      <Table
        data={plants}
        columns={columns}
        handleEdit={handleUpdate}
        handleDelete={handleDelete}
      />
      <Toast ref={toast} />
      <ConfirmDialog />
    </Layout>
  );
}

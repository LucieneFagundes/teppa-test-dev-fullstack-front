import { api } from "./api";

interface IPlantRequest {
  name: string;
  species?: string;
  notes?: string;
}

export async function getAllPlants(){
  const data = await api.get("/plants");
  return data.data
}
export async function getPlant(id: string){
  const data = await api.get(`/plants/${id}`);
  return data.data
}
export async function createPlant(plant: IPlantRequest){
  const data = await api.post(`/plants`, plant);
  return data.data
}
export async function updatePlant(plant: IPlantRequest){
  const data = await api.patch(`/plants`, plant);
  return data.data
}
export async function deletePlant(id:string){
  const data = await api.delete(`/plants/${id}`);
  return data.data
}
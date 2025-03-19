'use client'
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";
import { useState, useEffect } from "react";
import style from '../app/page.module.css'
import axios from "axios";

interface Client {
  id: number;
  name: string;
  email: string;
  job: string;
  rate: string;
  isactive: boolean;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [search, setSearch] = useState("");
  const [clientData, setClientData] = useState<Client | null>(null);
  const [tableData, setTableData] = useState<Client[]>([])

    const fechClient = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/clients/")
            setTableData(response.data)
        } catch (err: any) {
            console.log(err?.message || "Ocorreu um erro ao buscar os dados.");
        }
    }

    useEffect(() => {
      fechClient()
    },[])

  const handleOpen = (mode: string, client: any = null) => { 
    setClientData(client);
    setIsOpen(true);
    setModalMode(mode);
  }

  const handleSubmit = async (newClientData: any) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post("http://localhost:8000/api/clients/", newClientData);
        console.log('Client added:', response.data);
        setTableData((prevData) => [...prevData, response.data]);
      } catch (err) {
        console.error('Error adding client:', err);
      }
    } else {
      if (!clientData?.id) return;

      console.log('Updating client with ID:', clientData.id);
      try {
        const response = await axios.put(`http://localhost:8000/api/clients/${clientData.id}`, newClientData);
        console.log('Client updated:', response.data);
        setTableData((prevData) =>
          prevData.map((client) => (client.id === clientData.id ? response.data : client))
        );
      } catch (err) {
        console.error('Error updating client:', err);
      }
    }
  }

  return (
    <div className={style.main}>  
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearch} />
      <TableList className={style.tablelist} setTableData={setTableData} tableData={tableData} handleOpen={handleOpen} search={search} />
      <ModalForm 
        isOpen={isOpen} 
        OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode} 
        clientData={clientData} 
      />
    </div>
  );
}

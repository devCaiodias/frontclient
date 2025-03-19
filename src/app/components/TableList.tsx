'use client'
import { useState } from 'react';
import style from '../../../styles/TableList.module.css';
import axios from 'axios';

interface Client {
    id: number;
    name: string;
    email: string;
    job: string;
    rate: string;
    isactive: boolean;
}

export default function TableList({handleOpen, search, setTableData, tableData}: any) {

    
    const [error, setError] = useState<string | null>(null);


    const filtradoData = tableData.filter((client: Client) => 
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        client.job.toLowerCase().includes(search.toLowerCase())
    )   

    const handleDelet = async (id: number) => {
        const comfirmeDelete = window.confirm('Are you sure you want to delete this client')
        if (comfirmeDelete) {
            try {
                await axios.delete(`http://localhost:8000/api/clients/${id}`)
                setTableData((prevData: any) => prevData.filter((client: Client) => client.id !== id))
            } catch (err: any) {
                console.error(err.message)
            }
        }
    }

    return (
        <>

            {error && <div>{error}</div>}
            <div className={style.div_table}>
                <table className={style.table_}>
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Job</th>
                        <th>rate</th>
                        <th>isactive</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {filtradoData.map((client: Client) => (
                            <tr key={client.id}>
                                <th>{client.id}</th>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.job}</td>
                                <td>{client.rate}</td>
                                <td><button className={`${style.btn} ${client.isactive ? `${style.btn_isactive}  ` : `${style.btn_isoff}`}`}>{client.isactive ? 'Active' : 'Inactive'}</button></td>
                                <td>
                                    <button onClick={() => handleOpen("edit",client)} className={style.btn_update}>Update</button>
                                </td>
                                <td>
                                    <button className={style.btn_delete} onClick={() => handleDelet(client.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
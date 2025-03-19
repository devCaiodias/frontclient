'use client'
import { useEffect, useState } from "react";
import style from "../../../styles/ModalFrom.module.css";

export default function ModalFrom({ isOpen, onClose, mode, OnSubmit, clientData }: any) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [job, setJob] = useState("")
  const [rate, setRate] = useState("")
  const [onOff, setOnOff] = useState(false)

  const handleStatusChange = (e: any) => {
    setOnOff(e.target.value === 'Active')
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const clientData = {name, email, job, rate: Number(rate), isactive: onOff}
      await OnSubmit(clientData)
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (mode === 'edit' && clientData) {
      setName(clientData.name)
      setEmail(clientData.email)
      setJob(clientData.job)
      setRate(clientData.rate)
      setOnOff(clientData.isactive)
    } else {
      setName('')
      setEmail('')
      setJob('')
      setRate('')
      setOnOff(false)
      
    }
  }, [mode, clientData])

  return (
    <>
      <dialog id="my_modal_3" className={style.modal} open={isOpen}>
        <div className={style.modal_box}>
          <h1 className={style.modal_h1}>
            {mode === "edit" ? "Edit Client" : "Client Details"}
          </h1>
          <form method="dialog" onSubmit={handleSubmit}>
            <label className={style.label}>
              <input type="text" className={style.input_name} placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className={style.label}>
              <input type="text" className={style.input_name} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className={style.label}>
              <input type="text" className={style.input_name} placeholder="Job" value={job} onChange={(e) => setJob(e.target.value)} />
            </label>

            <div className={style.rate}>
              <label className={style.label}>
                <input type="number" className={style.input_name} placeholder="rate" value={rate} onChange={(e) => setRate(e.target.value)} />
              </label>
              <select value={onOff ? 'Active' : 'Inactive'} className={style.select} onChange={handleStatusChange}>
                  <option>Inactive</option>
                  <option>Active</option>
              </select>

            </div>

            <button className={style.btn_close} onClick={onClose}>
              ✕
            </button>
            <button type="submit" className={style.btn_confirme}>{mode === "edit" ? "Save Change" : "Add Client"}</button>
          </form>
        </div>
      </dialog>
    </>
  );
}

import React, {useState} from 'react'
import logo from '../../assets/logo.svg'
import './style.css'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

const ongId = localStorage.getItem('ongId')

export default function NewIncident() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()

    async function handleNewIncident(e) {
        e.preventDefault()
        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {headers: {Authorization: ongId,}})
            history.push('/profile')
        } catch {
            alert("Erro ao cadastrar. Tente novamente!")
        }

    }

    return (
        <div className='new-incident-container'>
            <div className = "content">
                <section>
                <img src={logo} alt='Be the Hero'></img>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

                <Link className="back-link" to='/profile'>
                <FiArrowLeft size={16} color='#E02041'/>
                voltar para home</Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder='Titulo do caso'
                    value={title} onChange = {e => setTitle(e.target.value)}/>
                    <textarea placeholder="Descrição"
                    value={description} onChange = {e => setDescription(e.target.value)}/>
                    <input placeholder="valor em reais"
                    value={value} onChange = {e => setValue(e.target.value)}/>
                    <button className='button' type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    )
}
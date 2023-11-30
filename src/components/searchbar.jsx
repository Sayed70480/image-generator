import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaSun, FaMoon } from 'react-icons/fa'
import searchbar from "./searchbar.css"

function SearchBar({ onsubmit }) {
    const [input, setInput] = useState({
        text: '',
    })

    const [active, setActive] = useState(false)

    const handlsub = ((e) => {
        e.preventDefault();
        onsubmit({
            text: input.text
        })
        setInput({
            text: ''
        })
    })


    const handChanges = (e) => {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value,
        })
    }



    const togChange = () => {
       if(active == false)
       {
        setActive(true)
       }else{
        setActive(false)
       }
    }

    useEffect(() => {
        if (active) {
            document.body.style.backgroundColor = "black"
            document.body.style.color = "white"
        }else{
            document.body.style.backgroundColor = "white"
            document.body.style.color = "black"
        }


    }, [active])

    return (
        <>
            <div className='Container'>
                <div className='Light-icon'>
                <h3>Search Images</h3>
                  <h2  className=' h2-icons' onClick={ togChange}> {!active ? <FaSun className='icon' /> : <FaMoon className='icon' />}</h2>
                </div>
                <Form className='Search-Bar' onSubmit={handlsub}>
                    <Form.Control type='text' id="disabledTextInput" name='text' value={input.text} className='input' placeholder="Search" onChange={handChanges} />
                    <Button type="submit" className='btn'>Submit</Button>
                </Form>

            </div>


        </>
    )
}

export default SearchBar
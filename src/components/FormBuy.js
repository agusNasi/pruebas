import { addDoc, collection, getFirestore, docs, getDoc, getDocs, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";


export const FormBuy = ({ levantarEstado }) => {


    const db = getFirestore();

    const { cart, totalPrice } = useCartContext();

    const finalCart = cart.map(product => ({ id: product.id, title: product.title, price: product.price, quantity: product.quantity }))


    const valorInicial = {
        nombre: '',
        email: '',
        tel: '',
    }

    const [user, setUser] = useState(valorInicial);
    const [lista, setLista] = useState({});
    const [estadoHijo, setEstadoHijo] = useState(true);


    const capturarInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const guardarDatos = async (e) => {
        e.preventDefault();
        levantarEstado(estadoHijo);
        try {
            await addDoc(collection(db, 'orders'), {
                ...user, finalCart, total: totalPrice()
            })

        } catch (error) {
            console.log(error);
        }


        setUser({ ...valorInicial })

    }



    useEffect(() => {
        const getLista = async() => {
            try {
                const querySnapshot = await getDocs(collection(db, 'orders'));
                const docs =[]
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id: doc.id})
                })

                setLista(docs)


            } catch (error) {
                console.log(error);
            }
        }
        getLista()
    }, [lista])
    


    return (
        <>
            <form className='formBuy' onSubmit={guardarDatos}>
                <div className="card card-body">
                    <div className="form-group">
                        <input type='text' name='nombre' className="form-control mb-3" placeholder="Nombre"
                            onChange={capturarInputs} value={user.nombre} />

                        <input type='text' name='email' className="form-control mb-3" placeholder="Email"
                            onChange={capturarInputs} value={user.email} />

                        <input type='text' name='tel' className="form-control mb-3" placeholder="Telofono"
                            onChange={capturarInputs} value={user.tel} />
                    </div>

                    <button className="btn btn-dark">
                        Finalizar Compra
                    </button>
                </div>
            </form>


        </>
    );
}
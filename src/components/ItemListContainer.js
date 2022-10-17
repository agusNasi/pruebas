import React, { useState, useEffect} from "react";
import { ItemList } from "./ItemList";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";



export const ItemListContainer = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        );
    }

    const filterProduct = (cat) => {
        const updatedList = data.filter(( x ) => x.category === cat);
        setFilter(updatedList);
    } 

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => {setFilter(data)}}>Todo</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => {filterProduct("men's clothing")}}>Hombre</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => {filterProduct("women's clothing")}}>Mujer</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => {filterProduct("jewelery")}}>Joyas</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => {filterProduct("electronics")}}>Electrodomesticos</button>
                </div>
				<ItemList data={filter}/>
            </>
        );
    }


    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Productos</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { ItemDetail } from "./ItemDetail";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";



export const ItemDetailContainer = () => {

    const {id} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setData(response.json());
            setLoading(false);
        }
        getProduct()
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6" style={{lineHeight:2}}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={150} />
                    <Skeleton height={50} width={300} />
                </div>
            </>
        );
    }
    const ShowProduct = () => {
        return(
            <>
                <ItemDetail data={data} />
            </>
        );
    }


    return (
        <div>
            <div className="container py-5">
                <div className="row py-5">
                    {loading ?  <Loading /> : <ShowProduct />}

                </div>

            </div>
        </div>
    );
}




    
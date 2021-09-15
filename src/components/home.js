import React, { useEffect, useState } from 'react';
import './home.css'

const Home = () => {

    const [allData, setAllData] = useState([]);
    const getData = async () => {
        try {
            let url = "https://restcountries.eu/rest/v2/region/asia?fields=name;capital;area;flag;region;subregion;population;borders;languages";

            let response = await fetch(url);
            let data = await response.json();
            setAllData(data)
        }
        catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getData();
    }, [])
    
    const refresh=()=>{
        window.location.reload(false);
    }

    return (
        <>

            <div className="btn-container">
                <button onClick={refresh}>REFRESH</button>
            </div>
            <div className="container" >

                {allData.map((data) => {
                    const { name, population, region, subregion, capital, area, flag, languages, borders } = data

                    return (
                        <div className="country" key="name">
                            <div className="image">
                                <img src={flag} alt="" />
                            </div>

                            <div className="country-detais">
                                <h2>{name}</h2>
                                <p>Captial : {capital}</p>
                                <p>Region : {region}</p>
                                <p>Sub-Region : {subregion}</p>
                                <p>Population : {population}</p>
                                <p>Area : {area}</p>
                                <p>Language : {languages[0].name}</p>
                            

                            
                                <p>Border Countries : </p>
                                <div className="borders">
                                    {borders.map((border) => {
                                        return (
                                            <ul key={border}>
                                                <li>{border}</li>
                                            </ul>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>)


                })}

            </div>
        </>
    )
}

export default Home

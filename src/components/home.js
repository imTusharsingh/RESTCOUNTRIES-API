import React, { useEffect, useState } from 'react';
import './home.css'

const Home = () => {
    const [filter,setFilter]=useState("all");
    const [allData, setAllData] = useState([]);
    
   
    const getData = async () => {
        try {
            let url = `https://restcountries.eu/rest/v2/${filter}?fields=name;capital;area;flag;region;subregion;population;borders;languages;alpha2Code`;
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

    const filterItem =(v)=>{
        setFilter(v)
       
        
      }

    return (
        <>
            <nav>
                <div className="name">
                    <span className="atoz">RestCountries API</span>
                    </div>
                <div className="regions">
                    <button className="btn_region" value={"all"} onMouseOver={(e) => filterItem(e.target.value)} onClick={getData}>All</button>
                    <button className="btn_region" value={"region/africa"} onMouseOver={(e)=> filterItem(e.target.value)} onClick={getData}>Africa</button>
                    <button className="btn_region" value={"region/americas"} onMouseOver={(e)=> filterItem(e.target.value)} onClick={getData}>Americas</button>
                    <button className="btn_region" value={"region/asia"} onMouseOver={(e)=> filterItem(e.target.value)} onClick={getData}>Asia</button>
                    <button className="btn_region" value={"region/europe"} onMouseOver={(e)=> filterItem(e.target.value)} onClick={getData}>Europe</button>
                    <button className="btn_region" value={"region/oceania"} onMouseOver={(e)=> filterItem(e.target.value)} onClick={getData}>Oceania</button>
                </div>
            </nav>

            <div className="btn-container">
                <button className="refresh" onClick={refresh}>REFRESH</button>
            </div>
            <div className="container" >

                {allData.map((data) => {
                    const { name, population, region, subregion, capital, area, flag, languages, borders,alpha2Code } = data

                    return (
                        <div className="country" key={alpha2Code}>
                            <div className="image">
                                <img src={flag} alt="" />
                            </div>

                            <div className="country-detais" >
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

import {React ,useState,useEffect} from "react";
import axios from "axios";
import SingleContent from "../../component/SingleContent/SingleContent";
import './Trending.css'
import CustomPagination from "../../component/Pagination/CustomPagination";


const Trending = () =>{
    const [Page, setPage] = useState(1)
    const [content, setcontent] = useState([]);
    const fetchTrending = async ()=>{
        const{data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=8312a2957bf5e287b6870c71356a21d3&page=${Page}`);
        
        setcontent(data.results);
    };
    useEffect(() => {
     fetchTrending();
    }, [Page]);


    return(
        <>
        <span>
        <span className="pageTitle">Trending</span>
        <hr/>
        </span>
        <div className="trending">
            {
                content && content.map((c)=>{
                 return(
                    <SingleContent key= {c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type ={c.media_type} rating= {c.vote_average} />
                 )  
                })
            }
        </div>
        <CustomPagination setPage={setPage}/>
        </>
    );
}

export default Trending;
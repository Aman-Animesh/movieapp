import { Pages } from "@material-ui/icons";
import axios from "axios";
import {React ,useState,useEffect} from "react";
import CustomPagination from "../../component/Pagination/CustomPagination";
import SingleContent from "../../component/SingleContent/SingleContent";

const Movies = () =>{
    const [Page, setPage] = useState(1)
    const [content, setcontent] = useState([]);
    const [numberOfPages, setnumberOfPages] = useState()
    const fetchMovies = async()=>{
        
     const {data} =  await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=8312a2957bf5e287b6870c71356a21d3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${Page}`);
    setcontent(data.results);
    setnumberOfPages(data.total_pages);
    }
    useEffect(() => {
     fetchMovies()
    },[Page])
    
    return(
        <>
        <span>
        <span 
        className="pageTitle">Movies</span>
        <hr/>
        
        </span>
        <div className="trending">
            {
                content && content.map((c)=>{
                 return(
                    <SingleContent key= {c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type ='movie' rating= {c.vote_average} />
                 )  
                })
            }
        </div>
       
            <CustomPagination setPage={setPage} numberOfPages={numberOfPages}/>
       
        

        
        </>
    );
}

export default Movies;
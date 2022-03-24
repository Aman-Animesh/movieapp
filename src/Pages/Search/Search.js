import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search"
import axios from "axios";
import SingleContent from "../../component/SingleContent/SingleContent";
import CustomPagination from "../../component/Pagination/CustomPagination";

const Search = () =>{

    const [type, settype] = useState(0)
    const [page, setPage] = useState(1)
    const [search, setSearchText] = useState("");
    const [content, setcontent] = useState();
    const [numOfPages, setNumOfPages] = useState()
    const darkTheme = createTheme({
        palette:{
            type:"light",
            primary:{
                main:"#2d313a",
            }
        }
    })

    const fetchSearch=async()=>{
      const {data} =  await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=8312a2957bf5e287b6870c71356a21d3&language=en-US&query=${search}&page=${page}&include_adult=false`);

        console.log(data);
        setcontent(data.results);
        setNumOfPages(data.total_pages)
    };
    useEffect(() => {
      window.scroll(0,0);
      fetchSearch();
    
    }, [type,page])
    

    return(
        <>
        <ThemeProvider theme={darkTheme}>
            <div style={{display:"flex", margin:"15px 0"}}>
            <TextField
         style={{
             flex:1, }}
             className="searchBox"
             label="search"
             variant="filled"
              onChange={(e)=> setSearchText(e.target.value)}
         />
         
         <Button variant="contained" style={{marginLeft:10}} onClick={fetchSearch}> <SearchIcon/> </Button>
            </div>
            <Tabs value={type} indicatorColor="primary" textColor="primary" onChange={(event,newValue)=>{
                settype(newValue);
                setPage(1);

            }}
            style={{paddingBottom:5}}
            >
                <Tab style={{width:"50%"}} label="Search Movies"/>
                <Tab style={{width:"50%"}} label="Search Tv Series"/>
            </Tabs>
        
        </ThemeProvider>
        <div className="trending">
            {
                content && content.map((c)=>{
                 return(
                    <SingleContent key= {c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type ={type?"tv":"movie"} rating= {c.vote_average} />
                 )  
                })
            }
            {search && content && (type?<h2>No Series</h2>:<h2>No Movies Found</h2>)}
        </div>
        {numOfPages >1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
        )}
        </>
    );
}

export default Search;
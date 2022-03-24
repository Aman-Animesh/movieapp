import { Pagination } from "@mui/material";
import React from "react";

const CustomPagination = ({setPage,numberOfPages=10})=>{

    const handlePageChange=(Page)=>{
        setPage(Page);
        window.scroll(0,0);
    };
    return(
        <>
        <div style={{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            marginTop:10,
            marginBottom:20,
        }}>

        
        <Pagination color="primary" count={numberOfPages} onChange={(e)=>handlePageChange(e.target.textContent)}
        hideNextButton
        hidePrevButton
        />
        </div>
        </>
    );
}
export default CustomPagination;
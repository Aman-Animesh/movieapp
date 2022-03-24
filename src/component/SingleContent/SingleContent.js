import { Badge } from '@material-ui/core';
import {img_300, unavailable} from '../../config/config.js';
import ContentModal from '../ContentModal/ContentModal.js';
import './SingleContent.css';

const SingleContent = ({
    id,poster,title,date,media_type,rating
    
})=>{
    return(
        <>
        
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent={rating} color={rating > 6? 'primary':'secondary'}/>
            <img className='poster' src={poster ? `${img_300}/${poster}`:unavailable } alt={title} />
            <b className='title'>{title} </b>
            <span className='subTitle'>{media_type==='tv' ? 'TV Series':'Movies'} 
            <span className='subTitle'>{date} </span>
            </span>
        </ContentModal>
       
        </>
    );
}

export default SingleContent;
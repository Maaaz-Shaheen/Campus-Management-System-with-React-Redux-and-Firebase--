import React from 'react';
import LoaderGif from '../images/loader.gif';

const LoadingPage = () => {
    return (
        <div className="text-center py-5 ">
            <img src={LoaderGif} alt='A loading page.' />
        </div>
    )
}

export default LoadingPage;
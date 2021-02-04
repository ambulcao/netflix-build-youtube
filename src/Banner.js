import React from 'react';
import './Banner.css';

function Banner() {

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }

    return (
        <header 
            className="banner" 
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png')`,
                backgroundPosition: "center center",
        }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">Nome do Filme</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">Minha Lista</button>
                </div>
    <h1 className="banner_description">{truncate(``,)}Isso é uma descrição de teste</h1>
            </div>
            <div className="banner--fadeBottom"/>        
        </header>
    );
}

export default Banner;

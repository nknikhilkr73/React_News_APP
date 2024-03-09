import React from 'react';

function NewsItem(props) {
    let { title, description, imgUrl, url, author, date } = props
    return (
        <div className='my-3' >
            <div className="card" >
                <img src={imgUrl} style={{ width: '100%', height: '200px' }} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {author} on {date} </small></p>
                    <a href={url} rel="noreferrer" target='_blank' className="btn btn-dark btn-sn">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
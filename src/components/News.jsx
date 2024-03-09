import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem.jsx';
import Spinner from "./Spinner.js";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setloading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // constructor() {
    //     super();
    //     this.state = {
    //         articles: [],
    //         loading: false,
    //         page: 1,
    //         totalResults: 0
    //     }
    // }

    // const handleNextClick = async () => {
    //     console.log("next");

    //     if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
    //     }
    //     else {
    //         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${this.state.page + 1}&pageSize=${props.pageSize}`
    //         this.setState({ loading: true })
    //         let response = await fetch(url)

    //         let data = await response.json()

    //         console.log(data)
    //         this.setState({
    //             page: this.state.page + 1,
    //             articles: data.articles,
    //             loading: false
    //         })
    //     }
    // }

    // const handlePreviousClick = async () => {
    //     console.log("previous");

    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${this.state.page - 1}&pageSize=${props.pageSize}`
    //     this.setState({ loading: true })
    //     let response = await fetch(url)
    //     let data = await response.json()

    //     console.log(data)
    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: data.articles,
    //         loading: false
    //     })

    // }


    const updateNews = async () => {
        try {
            props.setProgress(10);
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`

            setloading(true)
            let response = await fetch(url)
            props.setProgress(30);
            let data = await response.json()
            props.setProgress(70);

            console.log(data)

            setArticles(data.articles)
            setTotalResults(data.totalResults)
            setloading(false)
            props.setProgress(100);

        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        updateNews()
    }, [])


    const fetchMoreData = async () => {
        const nextPage = page + 1;

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${nextPage}&pageSize=${props.pageSize}`


        setloading(true)
        let response = await fetch(url)
        let data = await response.json()

        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
        setloading(false)
        setPage(nextPage)


    };

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '.....'
        }
        return text
    }

    return (

        <div className='container my-3'>
            <h1 style={{ marginTop: "80px", textAlign: 'center' }}>News Top headlines</h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >

                <div className="container">

                    <div className="row">

                        {/* !this.state.loading && */}

                        {articles.map((e, index) => {
                            const key = index;
                            const title = e.title ? truncateText(e.title, 35) : '';
                            const description = e.description ? truncateText(e.description, 55) : ''; // Null check for description
                            const img = e.urlToImage ? e.urlToImage : "https://i.pinimg.com/originals/b2/a7/8b/b2a78b7520577fc3664213e22bffd2c3.jpg"
                            const author = e.author ? e.author : 'Unknown';
                            const published = e.publishedAt;
                            const date = new Date(published)

                            return <div className="col-md-4" key={key}>
                                <NewsItem title={title} description={description} imgUrl={img} url={e.url}
                                    author={author} date={date.toUTCString()} />
                            </div>
                        })}
                    </div>
                </div>

            </InfiniteScroll >

            {/* {!this.state.loading && <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>} */}
        </div >

    );

}

News.defaultProps = {
    country: 'in',
    pageSize: 10,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}


export default News;
import React, { useEffect, useState } from "react";
import { getData } from "../functions/api";
import queryString from "query-string";
import "../styles/singlepage.css";
import Table from "./Table";
import { TableDataTypes, Pagination } from "../components/interfaces/interfaces"

enum Status {
    Idle,
    Loading,
    Loaded,
    Error,
    Limit
}

const statusSets: { [ key in Status ] : { color:string , message:string } } = {
    [Status.Idle]:{color:'#000',message:"wpisz dane"},
    [Status.Loading]:{color:'#aaa',message:"oczekiwanie..."},
    [Status.Loaded]:{color:'#000',message:"brak wyników..."},
    [Status.Error]:{color:'#e00',message:"wystąpił błąd"},
    [Status.Limit]:{color:'#e00',message:"przekroczono limit zapytań..."},
}

const SinglePage: React.FC = () => {
    const [phrase, setPhrase]        = useState<string>('');
    const [userName, setUserName]    = useState<string>('');
    const [language, setLanguage]    = useState<string>('go')
    const [tableData, setTableData]  = useState<TableDataTypes>({total_count:0})
    const [status, setStatus]        = useState<Status>(Status.Idle)
    const [pagination, setPagination]= useState<Pagination>({perPage: 15, page:1})
    
    useEffect(()=>{
        const queryParams = queryString.parse(window.location.search)
        if(queryParams.username&&queryParams.phrase&&queryParams.lang){
            const page = queryParams.page ? parseInt(queryParams.page.toString()) : 1;
            const perPage = queryParams.perPage ? parseInt(queryParams.perPage.toString()) : 15;
            setLanguage(queryParams.lang.toString())
            setUserName(queryParams.username.toString())
            setPhrase(queryParams.phrase.toString())
            setPagination({page:page,perPage:perPage})
        }
    },[])

    useEffect(()=>{
        if(userName&&phrase){
            window.history.replaceState(null,'',`/?username=${userName}&phrase=${phrase}&lang=${language}&page=${pagination.page}&perPage=${pagination.perPage}`)
            requestData()
        }
    },[pagination])

    const submit = (e:React.FormEvent) => {
        e.preventDefault()
        if(userName&&phrase){
            setPagination({...pagination, page:1})
        }
    }

    const requestData = async () => {
        setStatus(Status.Loading)
        setTableData({...tableData, total_count: 0})
        const response = await getData(userName,phrase,language,pagination)
        console.log(response)
        if(response.code){
            if(response.code==='ERR_BAD_REQUEST'){
                setStatus(Status.Limit)
                return;
        }}
        setStatus(Status.Loaded)
        setTableData(response)
    }

    const changePerPage = (value:number) => {
        setPagination({...pagination, perPage:value, page:1})
    }

    const goToPage = (value:number) => {
        const pages = Math.ceil(tableData.total_count / pagination.perPage)
        if(value<1)value=1;
        if(value>pages)value=pages;
        setPagination({...pagination, page:value})
    }


    return(
        <>
            <h1 className="title">Wyszukaj frazę w repozytorium GitHub</h1>
            <form id="form_gh" onSubmit={(e)=>submit(e)}>
                <div className="filters">
                    <div className="filter">
                        <div className="filter-name">Wyszukiwana fraza <p title="Wymagane" > *</p></div>
                        <input name="phrase" role="textbox" required placeholder="wyszukiwana fraza" value={phrase} onChange={(e)=>setPhrase(e.target.value)}/>
                    </div>
                    <div className="filter">
                        <div className="filter-name">Nazwa użytkownika <p title="Wymagane" > *</p></div>
                        <input name="username" role="textbox" required placeholder="nazwa użytkownika" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                    </div>
                    <div className="filter
                    ">
                        <div className="filter-name">Język</div>
                        <div className="select">
                            <select value={language} name="language" id="language" onChange={(e) => setLanguage(e.target.value)}>
                                <option value="go">Go</option>
                                <option value="java">Java</option>
                                <option value="js">JavaScript</option>
                            </select>
                            <span className="select-arrow"><img alt="arrow" src="./images/arrow.svg"/></span>
                        </div>
                    </div>
                </div>
                <button id="search" type="submit">wyszukaj</button>
            </form>
            <div className="table">
                {   tableData.total_count===0 ?
                    <div className="status" style={{color:statusSets[status].color,textAlign:"center"}}>{statusSets[status].message}</div>
                    :
                    <Table data={tableData} pagination={pagination} goToPage={goToPage} changePerPage={changePerPage}/>
                }
            </div>
        </>
    )
}

export default SinglePage;
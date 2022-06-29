import React, {KeyboardEvent, useEffect, useState} from "react"
import { TableDataTypes, Pagination, listElement } from "../components/interfaces/interfaces"
import { Avatar } from "./modals/Avatar"

interface Props {
    data: TableDataTypes,
    pagination: Pagination,
    goToPage: (v: number) => void,
    changePerPage: (v: number) => void
}

export const Table: React.FC<Props> = (props) => {
    const [list, setList] = useState<listElement[]>([])
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<number>(-1)

    useEffect(()=>{
        if(props.data.items){
            setList([])
            props.data.items.map((item,index)=>{
                const newItem = {index: index, filename: item.name, fileUrl: item.html_url, description: item.repository.description, username: item.repository.owner.login, avatar: item.repository.owner.avatar_url }
                setList(prevState => [...prevState, newItem])
            })
        }
    },[props])

    useEffect(()=>{
        if(selectedUser===-1) return;
        openModal()
    },[selectedUser])

    
    function openModal() {
        setModalOpen(true);
    }
    
    function closeModal() {
        setModalOpen(false);
        setSelectedUser(-1)
    }

    return(
        <>
            <table id="table"> 
                <tr>
                    <th className="th-file">Nazwa Pliku</th>
                    <th className="th-desc">Opis Repozytorium</th>
                    <th className="th-user">Użytkownik</th>
                </tr>
                {list && list.map((item,key)=>{
                    return(
                        <tr key={key}>
                            <td className="td-file"><a className="file-button" href={item.fileUrl} target="_blank">{item.filename}</a></td>
                            <td className="td-desc">{item.description}</td>
                            <td className="td-user"><button className="user-button" onClick={()=>setSelectedUser(key)}>{item.username}</button></td>
                        </tr>
                    )
                })}
            </table>
        
            <div id="pagination">
                <div className="left-pagination">
                    <div className="pagination-text">Pokaż</div> 
                    
                    <div className="select">
                        <select defaultValue={15} className="perPage-select" value={props.pagination.perPage} onChange={(e)=>props.changePerPage(parseInt(e.target.value))}>
                            <option value={5}>5</option>
                            <option value={15}>15</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="select-arrow2"><img src="./images/arrow.svg"/></span>
                    </div>
                    <div className="pagination-text">na stronie.</div>
                </div>
            {props.data.total_count>props.pagination.perPage?<div className="right-pagination">
                <button className="five" onClick={()=>props.goToPage(props.pagination.page-5)}>-5</button>
                <button className="left-arrow" onClick={()=>props.goToPage(props.pagination.page-1)}><img src="./images/arrow.svg"/></button>
                {props.pagination.page}
                <button className="right-arrow" onClick={()=>props.goToPage(props.pagination.page+1)}><img src="./images/arrow.svg"/></button>
                <button className="five" onClick={()=>props.goToPage(props.pagination.page+5)}>+5</button>
                {' z '+ Math.ceil(props.data.total_count / props.pagination.perPage).toString() + ' stron'}
            </div>:<>brak kolejnych stron</>}
        </div>




        {selectedUser !== -1 ? <Avatar user={list[selectedUser]} isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} /> : <></>}
    </>
    )
}

export default Table;
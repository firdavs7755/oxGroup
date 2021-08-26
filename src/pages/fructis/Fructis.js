import React, {useEffect, useState} from "react";
import {dataApi} from "../../services/data";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectData, selectToken} from "../../redux/actions/user_selector";
import {setData} from "../../redux/actions/userAction";
import {Button, Input, Modal, Table} from "antd";

const labelStyle={
    fontWeight:'500',
    fontSize:'16px'
}

function Fructis({SETDATA,DATA}) {
    const[visible,setVisible] = useState(false);
    const[finded,setFinded] = useState({});
    const handleModal=()=> {
        setVisible(!visible)
    }
    const[filterTable,setFilterTable]= useState();
    const bringData=()=>{
        dataApi.getData()
            .then(res=> {
                SETDATA(res.data)
                console.log('res', res)
            })
    }
    useEffect(()=>{
        bringData();
    },[]);
    const view=(id)=>{
        handleModal()
        setFinded(DATA.items.find(item=>item.id===id));
    }
    const dataSource = DATA.items;
    const columns = [
        {
            title: 'TR',
            dataIndex: 'id',
            key: 'id',
            width:'5%',
            render:(text,obj,index)=>(
                <p>{index+1}</p>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width:'25%',
            render:(text)=>(
                <p>{text}</p>
            )
        },
        {
            title: 'barcode',
            dataIndex: 'barcode',
            key: 'barcode',
            width:'15%',
            render:(text)=>(
                <p>{text}</p>
            )
        },
        {
            title: 'Supplier',
            dataIndex: `supplier`,
            key: 'supplier',
        },
        {
            title: 'actions',
            dataIndex: `actions`,
            key: 'actions',
            render:(text,obj,record)=>(
                <div className={''}>
                    <Button style={{backgroundColor:'rgba(123,174,210,0.74)'}} onClick={()=>view(obj.id)}>View</Button>
                </div>
            )
        },
    ];

    const searchData=(e)=>{
        e.preventDefault();
        let {value} = e.target;
        const fTable = dataSource.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        );
        setFilterTable(fTable);
    }
    return(
        <>
            {console.log('finded',finded)}
            <div style={{padding:'15px'}}>
                <Input
                    style={{ margin: "0 0 10px 0" }}
                    placeholder="Search by..."
                    enterButton
                    onChange={(e)=>searchData(e)}
                />
                <Table dataSource={filterTable == null ? dataSource : filterTable} columns={columns} />
            </div>
            <Modal
                title="Description modal"
                centered
                visible={visible}
                onOk={handleModal}
                onCancel={handleModal}
                width={1000}
                footer={null}
            >
                <div className={'d-flex justify-content-around'}>
                    <p style={labelStyle}>id:{finded.id}</p>
                    <p style={labelStyle}>brand:{finded.brand}</p>
                    <p style={labelStyle}>barCode:{finded.barcode}</p>
                    <p style={labelStyle}>product:{finded.product}</p>
                    <p style={labelStyle}>zone:{finded.zone}</p>
                    <p style={labelStyle}>sku:{finded.sku}</p>
                </div>
                <div className={'d-flex justify-content-around'}>
                    <p style={labelStyle}>name:{finded.name}</p>
                    <p style={labelStyle}>supplier:{finded.supplier}</p>
                </div>
                <hr/>
                <h3 style={{textAlign:'center'}}>import Records</h3>
                <div className={'d-flex justify-content-around'}>
                    <p style={labelStyle}>Product name:{finded.importRecord?.productName}</p>
                    <p style={labelStyle}>Product Sku:{finded.importRecord?.productSku}</p>
                    <p style={labelStyle}>approvals:{finded.importRecord?.approvals.map(item=>(item.count))}</p>
                </div>
            </Modal>
        </>
    )
}

const mstp = createStructuredSelector({
    DATA:selectData
})
const mdtp = dispatch =>({
    SETDATA:(data)=>dispatch(setData(data))
})

export default connect(mstp,mdtp)(Fructis)

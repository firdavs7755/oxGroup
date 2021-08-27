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
const arr=[
    {
        id:1,
        name:'Olmamhfjhfkkjk'
    },
    {
        id:2,
        name:'Nok'
    },
    {
        id:3,
        name:'Banan'
    },
    {
        id:6,
        name:'Ananas'
    },
    {
        id:4,
        name:'Olcha'
    },
    {
        id:5,
        name:'Anor'
    },
    {
        id:6,
        name:'gana'
    },
    {
        id:7,
        name:'Aba'
    }
]
function Fructis({SETDATA,DATA}) {
    const[visible,setVisible] = useState(false);
    const[finded,setFinded] = useState({});
    const[filterTable,setFilterTable]= useState();
    const[filteredInfo,setFilteredInfo]=useState({});
    const[sortedInfo,setSortedInfo]= useState({});
    const[dataSrc,setDataSrc]= useState();
    const[value,setValue]= useState();
    const handleModal=()=> {
        setVisible(!visible)
    }
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
    const arrCol=[
        {
            title:'id',
            dataIndex:'id',
            key:'id'
        },
        {
            title:'name',
            dataIndex:'name',
            key:'name',
            sorter: (a, b) => {
                if (a.name>b.name) return -1;
                if (a.name < b.name)
                    return 1
                return 0
            },
            // sortDirections: ['ascend'],
        },
    ];
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
            width:'25%'
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

    const searchName=(e)=>{
        e.preventDefault();
        let {value} = e.target;
        const fTable = dataSource.filter(o =>
            Object.keys(o).some(k =>
                String(o[k])
                    .toLowerCase()
                    .includes(value.toLowerCase())
            )
        );
        let l = []
        fTable.forEach(item=>{
            const i = item.name.toLowerCase().indexOf(value.toLowerCase());
            l.push({...item, target: i});
        })
        l.sort((a, b)=>{
            if (a.target > b.target) {
                return 1;
            }
            if (a.target < b.target) {
                return -1;
            }
            if (a.target === b.target){
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            }
            return 0;
        })
        setFilterTable(l);
    }

    return(
        <>
            {console.log('finded',finded)}
            <div style={{padding:'15px'}}>
                <Input
                    placeholder="Search Name"
                    value={value}
                    onChange={(e) => searchName(e)}
                />
                <Table dataSource={filterTable==null?dataSource:filterTable} columns={columns} />
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

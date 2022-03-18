import  React,{useEffect, useState} from "react"
import {
    Button,
    Table,
    Space,
    Card,
    Modal,
    Input,
    InputNumber,
    Tag,
    Select,
    Form
} from "antd"

const {Option} = Select

import useStore from "../../store";

const Home: React.FC = () => {
    const [form] = Form.useForm()
    const list = useStore((state)=> state.list)
    const editItem = useStore((state)=> state.editItem)
    const {getList,removeList,editList,addList,setEditItem} = useStore.getState()

    useEffect(()=>{
        getList()
    },[])

    const [visible,setVisible] = useState<boolean>(false)

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key:'name'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render:(tags: any[])=>[
                <>
                    {
                        tags?.map(tag=> {
                            let color = tag.length>5?'geekblue':'green'
                            if(tag=='loser'){
                                color = 'volcano'
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            )
                        })
                        
                    }
                </>
            ]
        },
        {
            title: 'Action',
            key: 'action',
            render:(_:any,record:{key:string})=>{
                return <Space size='middle'>
                    <Button 
                        type="primary"
                        onClick={()=>{
                            setEditItem(record)
                            setVisible(true)
                            form.setFieldsValue(record)
                        }}
                    >
                        修改
                    </Button>
                    <Button danger onClick={()=>removeList(record.key)}>
                        删除
                    </Button>
                </Space>
            }
        }
    ]

    const handleOk = ()=>{
        handleCancel()
        console.log(editItem,'editItem')
        form.validateFields().then(res => {
            console.log(res)
            editItem?editList({...editItem,...res}):addList(res)
        })
    }

    const handleCancel = () =>{
        setVisible(false)
    }

    return (
        <div>
            <h2>Home</h2>
            <Space>
                <Button type="primary" onClick={()=>setVisible(true)}>新增</Button>
                <Button onClick={()=>getList()}>refresh</Button>
            </Space>
            <Card>
                <Table 
                    dataSource={list}
                    columns = {columns}
                    rowKey={record => record.key}
                />
            </Card>
            <Modal 
                title={editItem?'修改信息':'新增信息'}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                afterClose={()=>{
                    form.resetFields()
                    setEditItem(undefined)
                }}
            >
                <Form form={form}>
                    <Form.Item label="姓名" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="年龄" name="age">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="地址" name="address">
                        <Input />
                    </Form.Item>
                    <Form.Item name="tags" label="tags">
                        <Select allowClear  mode="multiple">
                            <Option key="nice" value="nice">nice</Option>
                            <Option key="loser" value="loser">loser</Option>
                            <Option key="cool" value="cool">cool</Option>
                            <Option key="teacher" value="teacher">teacher</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Home;



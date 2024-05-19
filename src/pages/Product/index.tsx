import { removeProduct, getProductList } from '@/services/flower/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
    FooterToolbar,
    ModalForm,
    PageContainer,
    ProDescriptions,
    ProFormText,
    ProFormTextArea,
    ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Alert, Button, Drawer, Modal, Popover, message } from 'antd';
import { TableColumnType } from 'antd/lib';
import React, { useEffect, useRef, useState } from 'react';
import UpdateForm from './components/UpdateForm';
import { CATEGORY, CateGoryText, FLOWERMATERIAL, Material, OCCASION, Occasion } from './utils';
const { confirm } = Modal;




/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ProductInfo[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.productId),
        });
        hide();
        message.success('Deleted successfully and will refresh soon');
        return true;
    } catch (error) {
        hide();
        message.error('Delete failed, please try again');
        return false;
    }
};

const Product: React.FC = () => {
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.ProductInfo>();
    const [selectedRowsState, setSelectedRows] = useState<API.ProductInfo[]>([]);

    const columns: ProColumns<API.ProductInfo>[] = [
        {
            title: '商品ID',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '头图',
            dataIndex: 'mainImg',
            key: 'mainImg',
            width: '120',
            renderText: (text: string) => {
                return (
                    <Popover content={text}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '150px' }}>
                            {text}
                        </div>
                    </Popover>
                );
            },
        },
        {
            title: '其他图',
            dataIndex: 'imgList',
            key: 'imgList',
            width: '120',
            renderText: (text: string) => {
                return (
                    <Popover content={text}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis',maxWidth: '150px', whiteSpace: 'nowrap' }}>
                            {text}
                        </div>
                    </Popover>
                );
            },
        },
        {
            title: '类别',
            dataIndex: 'category',
            key: 'category',
            renderText: (category: CATEGORY) => {
                return <span>{CateGoryText[category]}</span>
            }, // 假设枚举值可以直接转换为字符串显示
        },
        {
            title: '场景',
            dataIndex: 'occasion',
            key: 'occasion',
            renderText: (occasion: OCCASION) => Occasion[occasion], // 同上
        },
        {
            title: '材质（花材）',
            dataIndex: 'flowerMaterial',
            key: 'flowerMaterial',
            renderText: (flowerMaterial: FLOWERMATERIAL) => Material[flowerMaterial], // 同上
        },
        {
            title: '数量',
            dataIndex: 'stemCount',
            key: 'stemCount',
        },
        
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '划线价格',
            dataIndex: 'originaPrice',
            key: 'originaPrice',
        },
        {
            title: '售卖数量',
            dataIndex: 'salesVolume',
            key: 'salesVolume',
        },
        {
            title: '上新时间',
            dataIndex: 'createTime',
            key: 'createTime',
            renderText: (time: number) => new Date(time).toLocaleString(),
        },
        {
            title: '更新时间',
            dataIndex: 'uploadTime',
            key: 'uploadTime',
            renderText: (time: number) => new Date(time).toLocaleString(),
        },
        {
            title: '详情',
            dataIndex: 'detail',
            key: 'detail',
            renderText: (text: string) => {
                return (
                    <Popover content={text}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                            {text}
                        </div>
                    </Popover>
                );
            },
        },
    
        {
            title: '材料内容',
            dataIndex: 'materialText',
            key: 'materialText',
            renderText: (text: string) => {
                return (
                    <Popover content={text}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                            {text}
                        </div>
                    </Popover>
                );
            },
        },
        {
            title: '包装',
            dataIndex: 'packing',
            key: 'packing',
            renderText: (text: string) => {
                return (
                    <Popover content={text}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                            {text}
                        </div>
                    </Popover>
                );
            },
        },
        {
            title: '操作',
            dataIndex: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        
                        setCurrentRow(record);
                        handleModalOpen(true);
                    }}
                >
                    修改
                </a>,
                <a key="subscribeAlert" onClick={() => {
                    confirm({
                        title: '确定删除吗？',
                        icon: <ExclamationCircleFilled />,
                        content: '删除后不可恢复哦！',
                        async onOk() {
                            await removeProduct({productId: record.productId})
                            actionRef.current?.reload();
                            console.log('OK');
                        },
                        onCancel() {
                            console.log('Cancel');
                        },
                    });
                   
                }}>
                    删除
                </a>,
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<API.ProductInfo, API.PageParams>
                headerTitle={'商品列表'}
                actionRef={actionRef}
                rowKey="key"
                search={false}
                scroll={{ x: true }} 
                request={async () => {
                    const res = await getProductList();
                    return {
                        data: res.result.list,
                        success: true,
                    };
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            setCurrentRow(undefined);
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                columns={columns}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            已选择{' '}
                            <a
                                style={{
                                    fontWeight: 600,
                                }}
                            >
                                {selectedRowsState.length}
                            </a>{' '}
                            项 &nbsp;&nbsp;
                            <span>
                                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
                            </span>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>
                    <Button type="primary">批量审批</Button>
                </FooterToolbar>
            )}
            <UpdateForm open={createModalOpen} onOpenChange={(y: boolean) => {
                if (actionRef.current) {
                    actionRef.current.reload();
                }
                handleModalOpen(y)
            }} productId={currentRow?.productId} />
        </PageContainer>
    );
};
export default Product;

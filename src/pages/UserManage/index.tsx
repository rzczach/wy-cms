import { removeProduct, getProductList, getReviewList, removeReview, getUserList } from '@/services/flower/api';
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
const handleRemove = async (selectedRows: API.UserData[]) => {
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

const UserManage: React.FC = () => {
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.UserData>();
    const [selectedRowsState, setSelectedRows] = useState<API.UserData[]>([]);

    const columns: ProColumns<API.UserData>[] = [
        {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        // 密码列通常不应该在用户列表中展示，以下代码仅为示例，实际应用中请移除或注释掉此列
        // {
        //   title: '密码',
        //   dataIndex: 'password',
        //   key: 'password',
        // },
        {
            title: '电话号码',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: '收货地址ID',
            dataIndex: 'shippingAddressID',
            key: 'shippingAddressID',
        },
        {
            title: '头像链接',
            dataIndex: 'profileImage',
            key: 'profileImage',
            render: (profileImage) => <img src={profileImage} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />, // 假设直接展示图片
        },
        {
            title: '注册时间',
            dataIndex: 'registrationTime',
            key: 'registrationTime',
            render: (registrationTime) => (typeof registrationTime === 'string' ? registrationTime : registrationTime.toLocaleString()), // 确保日期可以正确显示
        },
        {
            title: '最后登录时间',
            dataIndex: 'lastLoginTime',
            key: 'lastLoginTime',
            render: (lastLoginTime) => lastLoginTime && (typeof lastLoginTime === 'string' ? lastLoginTime : lastLoginTime.toLocaleString()), // 处理可能的未登录情况
        },
        {
            title: '操作',
            dataIndex: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        console.log('record', record);
                        // handleUpdateModalOpen(true);
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
                            await removeReview({ userId: record.userId })
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
            <ProTable<API.UserData, API.PageParams>
                headerTitle={'商品列表'}
                actionRef={actionRef}
                rowKey="key"
                search={false}
                request={async () => {
                    const res = await getUserList();
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
            }} reviewId={currentRow?.userId} />
        </PageContainer>
    );
};
export default UserManage;

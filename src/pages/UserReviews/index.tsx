import { removeProduct, getProductList, getReviewList, removeReview } from '@/services/flower/api';
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
const handleRemove = async (selectedRows: API.ReviewData[]) => {
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

const UserReviews: React.FC = () => {
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.ReviewData>();
    const [selectedRowsState, setSelectedRows] = useState<API.ReviewData[]>([]);

    const columns: ProColumns<API.ReviewData>[] = [
        {
            title: '评论ID',
            dataIndex: 'reviewId',
            key: 'reviewId',
          },
          {
            title: '产品ID',
            dataIndex: 'productId',
            key: 'productId',
          },
          {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
          },
          {
            title: '评分',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => `${rating}星`,
          },
          {
            title: '评论内容',
            dataIndex: 'comment',
            key: 'comment',
          },
          {
            title: '评论时间',
            dataIndex: 'reviewTime',
            key: 'reviewTime',
            render: (reviewTime) => (typeof reviewTime === 'string' ? reviewTime : reviewTime!.toLocaleString()), // 确保日期可以正确显示
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
                            await removeReview({reviewId: record.reviewId})
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
            <ProTable<API.ReviewData, API.PageParams>
                headerTitle={'商品列表'}
                actionRef={actionRef}
                rowKey="key"
                search={false}
                request={async () => {
                    const res = await getReviewList();
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
            }} reviewId={currentRow?.reviewId} />
        </PageContainer>
    );
};
export default UserReviews;

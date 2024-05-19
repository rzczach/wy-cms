import { getOrderList } from '@/services/flower/api';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
    PageContainer,
    ProDescriptions,
    ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Drawer, Tag } from 'antd';
import React, { useRef, useState } from 'react';

const formatStatus = (status: API.DeliveryStatus | API.OrderStatus, type: 'delivery' | 'order') => {
    let color: any;
    let text: string = '';
    if (type === 'delivery') {
        switch (status) {
            case 'Pending':
                color = 'warning';
                text = '待配送';
                break;
            case 'Delivered':
                color = 'success';
                text = '已配送';
                break;
            case 'Cancelled':
                color = 'error';
                text = '已取消';
                break;
            case 'Processing':
                color = 'warning';
                text = '正在处理';
                break;
            case 'Shipped':
                color = 'success';
                text = '已发货';
                break;
            default:
                color = 'default';
                text = '未知';
        }
    } else if (type === 'order') {
        switch (status) {
            case 'Unpaid':
                color = 'default';
                text = '未支付';
                break;
            case 'Paid':
                color = 'processing';
                text = '已支付';
                break;
            case 'Shipped':
                color = 'success';
                text = '已发货';
                break;
            case 'Cancelled':
                color = 'error';
                text = '已取消';
                break;
            case 'Completed':
                color = 'success';
                text = '已完成';
                break;
            case 'Refunded':
                color = 'error';
                text = '已退款';
                break;
            default:
                color = 'default';
                text = '未知';
        }
    }

    return <Tag color={color}>{text}</Tag>;
};
const Order: React.FC = () => {

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.OrderData>();
    const [showDetail, setShowDetail] = useState<boolean>(false);

    const columns: ProColumns<API.OrderData>[] = [
        {
            title: '订单ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '商品Id',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: '下单时间',
            dataIndex: 'orderDate',
            key: 'orderDate',
            renderText: (time: number) => new Date(time).toLocaleString(),
        },
        {
            title: '订单总价',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: '支付方式',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: '配送地址',
            dataIndex: 'deliveryAddress',
            key: 'deliveryAddress',
        },
        {
            title: '配送状态',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            renderText: (status: API.DeliveryStatus) => formatStatus(status, 'delivery'),
        },
        {
            title: '订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            renderText: (status: API.OrderStatus) => formatStatus(status, 'order'),
        },
        {
            title: '默认配送地址ID',
            dataIndex: 'shippingAddressId',
            key: 'shippingAddressId',
        },
        {
            title: '操作',
            dataIndex: 'option',
            render: (_, record) => [
                <a
                    key="config1"
                    onClick={() => {
                        setCurrentRow(record);
                        setShowDetail(true);
                    }}
                >
                    查看详情
                </a>,

            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<API.OrderData, API.PageParams>
                headerTitle={'订单列表'}
                actionRef={actionRef}
                rowKey="key1"
                search={false}
                request={async () => {
                    const res = await getOrderList();
                    return {
                        data: res.result.list,
                        success: true,
                    };
                }}
                columns={columns}
            />

            <Drawer
                width={600}
                open={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.orderId && (
                    <ProDescriptions<API.OrderData>
                        column={2}
                        title={currentRow?.orderNo}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.orderId,
                        }}
                        columns={columns as ProDescriptionsItemProps<API.OrderData>[]}
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};
export default Order;

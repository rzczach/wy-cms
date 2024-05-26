import type { ProFormInstance } from '@ant-design/pro-components';
import {
    ModalForm,
    ProFormSelect,

} from '@ant-design/pro-components';


import { useRef } from 'react';

import { createOrder,  getOrder,  updateOrder,} from '@/services/flower/api';


const Select = [
    {
        value: 'Pending',
        label: '待配送'
    },
    {
        value: 'Delivered',
        label: '已配送'
    },
    {
        value: 'Cancelled',
        label: '已取消'
    },
    {
        value: 'Processing',
        label: '正在处理'
    },
    {
        value: 'Shipped',
        label: '已发货'
    },
    {
        value: 'default',
        label: '未知'
    },
   
]

const SelectOrder = [
    {
        value: 'Unpaid',
        label: '未支付'
    }, {
        value: 'Paid',
        label: '已支付'
    },
    {
        value: 'Shipped',
        label: '已发货'
    }, {
        value: 'Cancelled',
        label: '已取消'
    },
    {
        value: 'Completed',
        label: '已完成'
    }, {
        value: 'Refunded',
        label: '已退款'
    },
   
]

export default (props: { open: boolean, onOpenChange: any, orderId?: number }) => {
    const formRef = useRef<
        ProFormInstance<API.OrderData>
    >();
    return (
        <ModalForm<API.OrderData>
            open={props.open}
            onOpenChange={props.onOpenChange}
            onFinish={async (values) => {
                console.log('onFinish', values);
                if (props.orderId) {
                    await updateOrder({ ...values, orderId: props.orderId });
                } else {
                    await createOrder(values);
                }
                return true;
            }}
            modalProps={{ destroyOnClose: true }}
            formRef={formRef}
            params={{ id: '100' }}
            formKey="base-form-use-demo"
            request={async () => {
               
                if (props.orderId) {
                    const res = await getOrder({ orderId: props.orderId });
                    
                    return res.result.info;
                }
                return {} as any;
            }}
            autoFocusFirstInput
        >
            <ProFormSelect
                width="xs"
                options={Select}
                name="deliveryStatus"
                label="配送状态"
            />
            <ProFormSelect
                width="xs"
                options={SelectOrder}
                name="orderStatus"
                label="订单状态"
            />
            

        </ModalForm>
    );
};
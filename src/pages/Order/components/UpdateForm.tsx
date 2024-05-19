import type { ProFormInstance } from '@ant-design/pro-components';
import {
    ModalForm,
    ProForm,
   
    ProFormDigit,

    ProFormMoney,
    ProFormSelect,

    ProFormTextArea,

} from '@ant-design/pro-components';


import { useRef } from 'react';

import { createOrder,  getOrder,  updateOrder,} from '@/services/flower/api';




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
                console.log('request', props.orderId);
                if (props.orderId) {
                    const res = await getOrder({ orderId: props.orderId });
                    console.log('res-0--', res);
                    return res.result;
                }
                return {} as any;
            }}
            autoFocusFirstInput
        >
            <ProFormSelect
                width="xs"
                options={[
                    {
                        value: 1,
                        label: '花束',
                    },
                    {
                        value: 2,
                        label: '礼盒',
                    },
                    {
                        value: 3,
                        label: '蛋糕',
                    },
                    {
                        value: 4,
                        label: '花篮',
                    },
                    {
                        value: 5,
                        label: '绿植',
                    },
                    {
                        value: 6,
                        label: '手提花篮',
                    },
                    {
                        value: 7,
                        label: '周花',
                    }
                ]}
                name="category"
                label="类别"
            />
            <ProFormSelect
                width="xs"
                options={[
                    {
                        value: 1,
                        label: '爱情',
                    },
                    {
                        value: 2,
                        label: '生日',
                    },
                    {
                        value: 3,
                        label: '友情',
                    },
                    {
                        value: 4,
                        label: '探病',
                    },
                    {
                        value: 5,
                        label: '道歉',
                    },
                    {
                        value: 6,
                        label: '问候',
                    },
                    {
                        value: 7,
                        label: '感谢',
                    },
                    {
                        value: 8,
                        label: '哀思',
                    },
                    {
                        value: 9,
                        label: '商务',
                    }
                ]}
                name="occasion"
                label="场景"
            />
            <ProFormSelect
                width="xs"
                options={[
                    {
                        value: 1,
                        label: '玫瑰',
                    },
                    {
                        value: 2,
                        label: '百合',
                    },
                    {
                        value: 3,
                        label: '康乃馨',
                    },
                    {
                        value: 4,
                        label: '向日葵',
                    },
                    {
                        value: 5,
                        label: '满天星',
                    },
                    {
                        value: 6,
                        label: '郁金香',
                    },
                    {
                        value: 7,
                        label: '菊花',
                    },
                    {
                        value: 8,
                        label: '其他',
                    }]
                }
                name="flowerMaterial"
                label="材质"
            />
            <ProForm.Group>
                <ProFormDigit name="stemCount" label="数量" width="lg" />
            </ProForm.Group>
            <ProFormMoney
                width="md"
                name="price"
                label="价格"
                fieldProps={{
                    numberPopoverRender: true,
                }}
            />
            <ProFormMoney
                width="md"
                name="originaPrice"
                label="划线价格"
                fieldProps={{
                    numberPopoverRender: true,
                }}
            />
            <ProForm.Group>
                <ProFormDigit name="salesVolume" label="售卖数量" width="lg" />
            </ProForm.Group>
            <ProFormTextArea
                colProps={{ span: 24 }}
                name="detail"
                label="详情"
            />

        </ModalForm>
    );
};
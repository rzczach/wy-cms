import type { ProFormInstance } from '@ant-design/pro-components';
import {
    ModalForm,
    ProForm,
    ProFormCascader,
    ProFormDatePicker,
    ProFormDateRangePicker,
    ProFormDigit,
    ProFormList,
    ProFormMoney,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    ProFormTreeSelect,
} from '@ant-design/pro-components';
import { TreeSelect, message } from 'antd';
import moment from 'dayjs';
import { useRef } from 'react';
import { CateGoryText } from '../utils';
import { createProduct, getProductInfo, getProductList, updateProductInfo } from '@/services/flower/api';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};



export default (props: { open: boolean, onOpenChange: any, productId?: number }) => {
    const formRef = useRef<
        ProFormInstance<API.ProductInfo>
    >();
    return (
        <ModalForm<API.ProductInfo>
            open={props.open}
            onOpenChange={props.onOpenChange}
            onFinish={async (values) => {
                console.log('onFinish', values);
                if (props.productId) {
                    await updateProductInfo({ ...values, productId: props.productId });
                } else {
                    await createProduct(values);
                }
                return true;
            }}
            modalProps={{ destroyOnClose: true }}
            formRef={formRef}
            params={{ id: '100' }}
            formKey="base-form-use-demo"
            request={async () => {
                console.log('request', props.productId);
                if (props.productId) {
                    const res = await getProductInfo({ productId: props.productId });
                    console.log('res-0--', res);
                    return res.result;
                }
                return {} as any;
            }}
            autoFocusFirstInput
        >
            <ProFormText
                name="name"
                label={'名字'}
                width="md"
                rules={[
                    {
                        required: true,
                        message: '请输入规则名称！',
                    },
                ]}
            />
            <ProFormText
                name="mainImg"
                label={'头图地址'}
                width="md"
                rules={[
                    {
                        required: true,
                        message: '请输入规则名称！',
                    },
                ]}
            />
            <ProFormText
                name="imgList"
                label={'其他图片地址JSON'}
                width="md"
                
            />
            <ProFormText
                name="packing"
                label={'包装'}
                width="md"
                
            />
            <ProFormText
                name="materialText"
                label={'材料内容详情页用'}
                width="md"
                
            />
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
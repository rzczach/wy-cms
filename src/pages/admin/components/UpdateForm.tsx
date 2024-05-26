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
import { createAdmin, createProduct, createReview, getProductInfo, getProductList, getReviewtInfo, updateProductInfo, updateReviewInfo } from '@/services/flower/api';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};



export default (props: { open: boolean, onOpenChange: any, reviewId?: number }) => {
    const formRef = useRef<
        ProFormInstance<API.ReviewData>
    >();
    return (
        <ModalForm<API.ReviewData>
            open={props.open}
            onOpenChange={props.onOpenChange}

            onFinish={async (values) => {
                console.log('onFinish', values);
                if (props.reviewId) {
                    await updateReviewInfo({ ...values, canAdmin: !!values.canAdmin, reviewId: props.reviewId });
                } else {
                    await createAdmin(values);
                }
                return true;
            }}
            modalProps={{ destroyOnClose: true }}
            formRef={formRef}
            params={{ id: '100' }}
            formKey="base-form-use-demo"
            request={async () => {

                if (props.reviewId) {
                    const res = await getReviewtInfo({ reviewId: props.reviewId });
                    return res.result;
                }
                return {} as any;
            }}
            autoFocusFirstInput
        >
            <ProForm.Group>
                <ProFormText name="username" label="用户名" width="lg" />
            </ProForm.Group>
            <ProForm.Group>
                
                <ProFormSelect
                    name="canAdmin"
                    width="md"
                    label={'权限'}
                    valueEnum={{
                        1: '开启',
                        0: '关闭',
                    }}
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText name="password" label="用户密码" width="lg" />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText name="email" label="邮箱" width="lg" />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText name="phoneNumber" label="手机号" width="lg" />
            </ProForm.Group>


        </ModalForm>
    );
};
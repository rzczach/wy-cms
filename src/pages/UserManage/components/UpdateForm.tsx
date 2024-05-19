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
import { createProduct, createReview, getProductInfo, getProductList, getReviewtInfo, updateProductInfo, updateReviewInfo } from '@/services/flower/api';

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
                    await updateReviewInfo({ ...values, reviewId: props.reviewId });
                } else {
                    await createReview(values);
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
                <ProFormDigit name="productId" label="商品id" width="lg" />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormDigit name="userId" label="用户id" width="lg" />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormDigit name="rating" label="评分1-5" width="lg" />
            </ProForm.Group>
            <ProFormTextArea
                colProps={{ span: 24 }}
                name="comment"
                label="评论内容"
            />

        </ModalForm>
    );
};
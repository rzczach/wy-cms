import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
const Admin: React.FC = () => {
    return (
        <PageContainer content={'这是标题'}>
            <Card>
                <Alert
                    message={'更快更强的重型组件，已经发布。'}
                    type="success"
                    showIcon
                    banner
                    style={{
                        margin: -12,
                        marginBottom: 48,
                    }}
                />
                <Typography.Title
                    level={2}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <SmileTwoTone /> 管理员 <HeartTwoTone twoToneColor="#eb2f96" /> You
                </Typography.Title>
            </Card>
        </PageContainer>
    );
};
export default Admin;

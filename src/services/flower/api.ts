// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
    return request<{
        result: API.CurrentUser;
    }>('/flower/v1/users/info', {
        method: 'GET',
        params: {
            ...(options || {}),
        }

    });
}
interface UserInfo {
    code: number;
    result: {
        list: API.UserData[]
    }
}
/** 获取规则列表 GET /api/rule */
export async function getUserList() {
    return request<UserInfo>('/flower/v1/users/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/login/outLogin', {
        method: 'POST',
        ...(options || {}),
    });
}
interface LoginParams {
    username: number;
    password: number;
}

/** 登录接口 POST /api/login/account */
export async function login(body: LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/flower/v1/users/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        params: {
            phoneNumber: body.username,
            password: body.password
        },
    });
}


interface ProductInfo {
    code: number;
    result: {
        list: API.ProductInfo[]
    }
}
/** 获取规则列表 GET /api/rule */
export async function getProductList() {
    return request<ProductInfo>('/flower/v1/product/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export async function createProduct(data: Partial<API.ProductInfo> ) {
    return request<ProductInfo>('/flower/v1/product/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    });
}
export async function getProductInfo(data: Partial<API.ProductInfo>) {
    return request<ProductInfo>('/flower/v1/product/info', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: data
    });
}


/** 更新规则 PUT /api/rule */
export async function updateProductInfo(data: Partial<API.ProductInfo>) {
    return request<ProductInfo>('/flower/v1/product/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    });
}


/** 删除规则 DELETE /api/rule */
export async function removeProduct(data: Partial<API.ProductInfo>) {
    return request<Record<string, any>>('/flower/v1/product/delete', {
        method: 'POST',
        data: data
    });
}

/**订单管理相关---------------- */
interface OrderInfo {
    code: number;
    result: {
        list: API.OrderData[]
    }
}
export async function getOrderList() {
    return request<OrderInfo>('/flower/v1/order/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export async function createOrder(data: Partial<API.OrderData>) {
    return request<OrderInfo>('/flower/v1/order/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    });
}
export async function getOrder(data: Partial<API.OrderData>) {
    return request<OrderInfo>('/flower/v1/order/create', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    });
}
export async function updateOrder(data: Partial<API.OrderData>) {
    return request<OrderInfo>('/flower/v1/order/update', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    });
}

// 留言管理

interface ReviewInfo {
    code: number;
    result: {
        list: API.ReviewData[]
    }
}
/** 获取规则列表 GET /api/rule */
export async function getReviewList() {
    return request<ReviewInfo>('/flower/v1/reviews/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export async function createReview(data: Partial<API.ReviewData> ) {
    return request<ProductInfo>('/flower/v1/reviews/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    });
}
export async function getReviewtInfo(data: Partial<API.ReviewData>) {
    return request<ProductInfo>('/flower/v1/reviews/infoByReviewId', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        params: data
    });
}



export async function updateReviewInfo(data: Partial<API.ReviewData>) {
    return request<ProductInfo>('/flower/v1/reviews/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    });
}


/** 删除规则 DELETE /api/rule */
export async function removeReview(data: Partial<API.ReviewData>) {
    return request<Record<string, any>>('/flower/v1/reviews/delete', {
        method: 'POST',
        data: data
    });
}
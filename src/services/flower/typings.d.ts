// @ts-ignore
/* eslint-disable */

declare namespace API {
    type CurrentUser = {
        userId: number;
        username: string;
        email: string;
        password: string;
        phoneNumber: number;
        shippingAddressID: number;
        profileImage: number;
        registrationTime: Date;
        lastLoginTime: Date;
    };

    type LoginResult = {
        code?: number;
        message?: string;
        result?: {
            userId?: number;
            flag: boolean;
        };
    };

    type PageParams = {
        current?: number;
        pageSize?: number;
    };

    type ProductInfo = {
        /**
          * 商品id
          */
        productId: number;
        name: string;
        mainImg: string;
        imgList :string[];
       
        /**
         * 类别
         */
        category: CATEGORY;
        /**
         *  场景
         */
        occasion: OCCASION;
        /**
         * 材质 花材
         */
        flowerMaterial: FLOWERMATERIAL;
        /**
         * 数量
         */
        stemCount: number;
        /**
         * 价格
         */
        price: number;
        /**
        * 划线价格
        */
        originaPrice: number;
        /**
        * 售卖数量
        */
        salesVolume: number;
        /**
        * 上新时间
        */
        createTime: number;
        /**
        * 更新时间
        */
        uploadTime: number;
        /**
         * 详情
         */
        detail: string;
        /**
         * 配送信息
         */
        deliveryInfo: string
    };

    // 定义订单状态枚举
    enum OrderStatus {
        Unpaid = 'Unpaid',
        Paid = 'Paid',
        Completed = 'Completed',
        Cancelled = 'Cancelled',
        Shipped = 'Shipped',
        Refunded = 'Refunded',
    }

    // 定义配送状态枚举
    enum DeliveryStatus {
        Pending = 'Pending',
        Processing = 'Processing',
        Shipped = 'Shipped',
        Delivered = 'Delivered',
        Cancelled = 'Cancelled',
    }

    // 订单模型的 TypeScript 类型定义
    type OrderData = {
        orderId: number; // 主键，订单ID，自增
        userId: number; // 用户ID，关联用户表
        orderNo: string; // 订单编号，通常由系统生成，唯一
        orderDate: Date; // 下单时间，默认为当前时间
        totalPrice: number; // 订单总价，两位小数精度
        paymentMethod?: string; // 支付方式，可选
        deliveryAddress: string; // 配送地址，必填
        deliveryStatus: DeliveryStatus; // 配送状态，默认为Pending
        orderStatus: OrderStatus; // 订单状态，默认为Unpaid
        shippingAddressId?: number; // 默认配送地址ID，关联用户地址表，可选
    }
    // 留言相关
    type ReviewData = {
        reviewId: number;
        productId: number;
        userId: number;
        rating: number;
        comment: string;
        reviewTime: string | Date; // 假设从后端获取的数据中reviewTime已被转换为字符串或已处理为可直接显示的日期格式
    }
    type UserData = {
        userId: number;
        username: string;
        email: string;
        password: string; // 注意：在实际应用中，密码通常不应该直接展示给用户
        phoneNumber: number;
        shippingAddressID: number;
        profileImage: string;
        registrationTime: string | Date; // 假设从数据库查询结果中时间已经被转换为前端可直接使用的格式
        lastLoginTime?: string | Date; // 可选，因为updatedAt被设置为false，但这里为了完整性包含它
    }
}

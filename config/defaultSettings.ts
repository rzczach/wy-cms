import { ProLayoutProps } from '@ant-design/pro-components';
import logo from '../public/icons/wy.png';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '鲜花网站后台管理系统',
  pwa: true,
  logo: 'https://tcdn.kaishustory.com/kstory/activity_flow/image/340c3d31-4d63-40ce-956c-82b01b5e86ce_info_w=300_h=300_s=33813.png',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;

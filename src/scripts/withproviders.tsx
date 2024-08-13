import React from 'react';
// import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from "antd";
import Providers from './providers';

const withProviders = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => (
    <Providers>
      {/* <AntdRegistry> */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4DAE37",
              colorLink: "#4DAE37",
              fontFamily: "var(--font-cabinet)",
            },
          }}
        >
          <Component {...props} />
        </ConfigProvider>
      {/* </AntdRegistry> */}
    </Providers>
  );
};

export default withProviders;

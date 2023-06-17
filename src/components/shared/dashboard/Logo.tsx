import { Layout } from 'antd';
import Image from 'next/image';
const { Header } = Layout;

export default function Logo() {
  return (
    <Header className="bg-white ps-3">
      <div className="h-full">
        <Image
          priority
          src="/icon-384x384.png"
          alt="Abbey Machinery Company Logo"
          width={310}
          height={150}
          className="h-full w-full max-w-sm"
        />
      </div>
    </Header>
  );
}

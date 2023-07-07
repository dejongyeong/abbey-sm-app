import { Card, Typography, message } from 'antd';

const { Text } = Typography;

const AssignForm = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Card className="mb-7">
      {contextHolder}
      <Text className="text-gray-600 font-semibold">Assign Machines</Text>
    </Card>
  );
};

export default AssignForm;

// dealer
// get list of machines associated to dealer and that no association to the farm manager
// get list of farm managers invited by the dealer
// assign & unassign

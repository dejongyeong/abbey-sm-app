import moment from 'moment';

export const getTableData = (machines: any[], user: any) => {
  let dataSource: any[] = [];

  switch (user?.role.alias) {
    case 'dealership':
      dataSource = machines?.map((machine: any) => ({
        key: machine.id,
        serial_no: machine.serial_no,
        model_no: machine.serial_no,
        type: machine.type.name,
        registrar_id: machine.registrar_id,
        registrar_first_name: machine.registrar.first_name,
        registrar_last_name: machine.registrar.last_name,
        registrar_dial_code: machine.registrar.dial_code,
        registrar_phone: machine.registrar.phone,
        registrar_email: machine.registrar.email,
        registrar_company: machine.registrar?.company?.name,
      }));

      break;
    case 'farm-manager':
      dataSource = machines?.map((machine: any) => ({
        key: machine.id,
        serial_no: machine.serial_no,
        model_no: machine.model_no,
        type: machine.type.name,
        dealer_id: machine.dealership_id,
        dealer_first_name: machine.dealership?.first_name,
        dealer_last_name: machine.dealership?.last_name,
        dealer_dial_code: machine.dealership.dial_code,
        dealer_phone: machine.dealership.phone,
        dealer_email: machine.dealership.email,
        dealer_company: machine.dealership?.company?.name,
      }));
      break;
    case 'farmer':
      dataSource = machines?.map((machine: any) => ({
        key: machine.id,
        serial_no: machine.serial_no,
        model_no: machine.model_no,
        type: machine.type.name,
        farm_manager_id: machine.farm_manager_id,
        farm_manager_first_name: machine.farm_manager?.first_name,
        farm_manager_last_name: machine.farm_manager?.last_name,
        farm_manager_dial_code: machine.farm_manager?.dial_code,
        farm_manager_phone: machine.farm_manager?.phone,
        farm_manager_email: machine.farm_manager.email,
      }));
      break;
    default:
      dataSource = machines?.map((machine: any) => ({
        key: machine.id,
        serial_no: machine.serial_no,
        model_no: machine.model_no,
        type: machine.type.name,
        prod_date: `${moment(machine.prod_date).format('DD-MM-YYYY HH:mm:ss')}`,
        dealer_id: machine.dealership_id,
        dealer_first_name: machine.dealership?.first_name,
        dealer_last_name: machine.dealership?.last_name,
        dealer_dial_code: machine.dealership.dial_code,
        dealer_phone: machine.dealership.phone,
        dealer_email: machine.dealership?.phone,
        dealer_company: machine.dealership?.company.name,
        farm_manager_id: machine.farm_manager_id,
        farm_manager_first_name: machine.farm_manager?.first_name,
        farm_manager_last_name: machine.farm_manager?.last_name,
        farm_manager_dial_code: machine.farm_manager?.dial_code,
        farm_manager_phone: machine.farm_manager?.phone,
        farm_manager_email: machine.farm_manager?.email,
        farm_manager_company: machine.farm_manager?.company?.name,
      }));
      break;
  }

  return dataSource;
};

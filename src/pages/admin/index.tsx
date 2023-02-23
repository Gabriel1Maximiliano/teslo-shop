
import React from 'react';

import { AdminLayout } from '../../../components/layouts/AdminLayout';
import  DashboardOutlined from "@mui/icons-material/DashboardOutlined";


const DashboardPage = () => {
  return (
   <AdminLayout title={'Dashboard'} subtitle={'Estadísticas generales'} icon={<DashboardOutlined />}>
<h3>Hola admin mundo!! :</h3>
   </AdminLayout>
  

  
  )
}

export default DashboardPage
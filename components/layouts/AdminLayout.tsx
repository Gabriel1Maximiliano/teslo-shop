import  Typography from "@mui/material/Typography";
import  Box from "@mui/material/Box";
import { AdminNavbar } from "components/admin";
import { SideMenu } from "components/ui";




interface Props {
    title:string;
    subtitle:string;
    icon?:JSX.Element;
    children?: any;
}

export const AdminLayout = ({ children,title,subtitle,icon  }:Props) => {
  return (
    <>
   

    <nav>
      <AdminNavbar />
    </nav>

    {/* todo : SideBar */}
        <SideMenu />
    <main 
    style={{
        margin:'80px auto',
         maxWidth:'1440px', 
         padding:'0px 30px' 
         }} 
         >
            <Box display='flex' flexDirection='column'>
                <Typography variant='h1' component='h1' >
                    { icon }
                    {''} { title }
                </Typography>
                <Typography variant='h2' sx={{ mb:1 }}>{subtitle}</Typography>
            </Box>
            <Box className="fadeIn" >
                  { children }
            </Box>
    </main>
    {/* footer */}
  
    </>
  )
}

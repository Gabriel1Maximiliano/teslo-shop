import { Navbar, SideMenu } from "components/ui";
import Head from "next/head"



interface Props {
    title:string;
    pageDescription:string;
    imageFullUrl?: string;
    children?: any;
}

export const ShopLayouts = ({ children,title,pageDescription,imageFullUrl  }:Props) => {
  return (
    <>
    <Head>
        <title>{ title }</title>
        <meta name="decription" content={ pageDescription } />
        <meta name="og:title" content={ pageDescription } />
        <meta name="og:description" content={ pageDescription } />
        {
            imageFullUrl && (
                <meta name="og:iamge" content={ imageFullUrl } />
            )
        }

    </Head>

    <nav>
        <Navbar/>
    </nav>

    {/* todo : SideBar */}
        <SideMenu />
    <main style={{ margin:'80px auto', maxWidth:'1440px', padding:'0px 30px' }} >
        { children }
    </main>
    {/* footer */}
    <footer>
        {/* mi custom footer */}
    </footer>
    </>
  )
}

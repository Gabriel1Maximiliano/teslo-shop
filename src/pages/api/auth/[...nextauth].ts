

 import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from 'database';




export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.VERCEL_URL_SECRET,// me da error JWEDecryptionFailed si no lo pongo
  
  
  providers: [
    
    // ...add more providers here

    Credentials({
      credentials:{
      email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
      password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
      },
      
      authorize:  async function (credentials:any):Promise<any>{
        return await dbUsers.checkUSerEmailPassword( credentials!.email, credentials!.password );
      }
    }),


    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  

  //Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  
  // Callbacks
  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },
  
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },


  callbacks: {

   
   
    async jwt({ token, account, user }) {
      //console.log({ token, account, user })
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        
      }
     

         switch( account?.type ) {

           case 'oauth': 
             token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
           break;

           case 'credentials':
             token.user = user;
           break;
         }

   

      return token
    },
  
     
     async session({ session, token,user }: { session: any; token: any,user:any }) {

      console.log({session,token,user})
     session.accessToken = token.accessToken;
     session.user=token.user as any ;
      return session
    
    
    
     }
    },
    
  

});


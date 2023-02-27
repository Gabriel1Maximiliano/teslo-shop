import { Slide } from 'react-slideshow-image';
import styles from './ProductSlideshow.module.css';
import 'react-slideshow-image/dist/styles.css'

interface Props {
  images:string[];
}
export const ProductSlideshow = ( {images}:Props ) => {
  return (
    
    <Slide
     duration={ 7000 }
     indicators>
       {
        images.map( image => {
          //const url = `products/1740250-00-A_0_2000.jpg`
          //const url = `products/${ image }`
         
         
          return (
           
             <div className={ styles['each-slide'] } key={ image } >
              <div style={{ 
               
                backgroundImage:`url(${ image })`,// cambiar para trabajar sólo con imágenes != de cloudinari 
            //     //backgroundImage:`/products/1473834-00-A_2_2000.jpg,/products/1473829-00-A_2_2000.jpg`,
                 //backgroundImage: `${ image }`,
                 backgroundSize:'cover'
               }} >

               </div>
           </div>
          )
        } )
      }
    </Slide>
   
  )
}
 // <Slide
    // easing='easy'
    // duration={ 7000 }
    // indicators
    // >
      {/* {
        images.map( image => {

          return false
          // const url = `products/${ image }`
          // return (
          //   <div className={ '' } key={ image } >
          //     <div style={{
          //       backgroundImage:`url${ url }`,

          //       backgroundSize:'cover'
          //     }} >

          //     </div>
          //   </div>
          // )
        } )
      } */}
    // </Slide>

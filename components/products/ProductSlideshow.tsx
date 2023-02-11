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
          const url = `products/${ image }`
         
          return (
            <div className={ styles['each-slide'] } key={ image } >
              <div style={{ //products/${ product.images[0] }
                backgroundImage:`url(/${ url })`,

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

import { ProductDetail } from "@interfaces/IProduct"
import { useState } from "react"
import RadioButtonInput from "@components/RadioButtonInput"
import { apiCall } from "tools/apiCall"
import { ResponseCartApi } from "@pages/api/interfaz"
import { toast } from "react-toastify"

interface Variant {
  subProductId: string
  color: string
  sizes: string[]
}
interface SelectorVarienteProps {
  product: ProductDetail
}

const SelectorVariante = ({product}: SelectorVarienteProps)=> {
  
    const variants = Object.entries(product.subcodigo_color_dict).map(i => (
      {
        subProductId: i[0],
        ...i[1]
      }
    )) 

    const [currentVariant, setCurrentVariant] = useState<Variant>(variants[0])
    const [size, setSize] = useState<string>('')
    const [color, setColor] = useState<string>(currentVariant.color)

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setColor(event.target.value)
      const variant = variants.find(v => v.color === event.target.value)
      if(variant){
        setCurrentVariant(variant)
      }
    }

    function handleSizeChange(event: React.ChangeEvent<HTMLInputElement>){
      setSize(event.target.value)
    }

    function handleOnSubmit(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault()
      console.log('submit', currentVariant.subProductId, size );
      console.log('variantes', product.subcodigo_color_dict)
      const url = `/api/cart/add/`
    apiCall<ResponseCartApi>({
      url,
      method:'POST',
      body:{
        subProductId: currentVariant.subProductId,
        size,
      }
    })
    .then((data) => {
      console.log('cart', data)
      toast.success(data.message);
    })
    .catch(err => alert(err.message))
    }

    return (
        <form className="mt-10" onSubmit={handleOnSubmit}>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900">Color</h3>

          {/* selector color aca */}
          <RadioButtonInput 
            name="color-choice" 
            totalItemsList={product.available_colors} 
            itemsAvailables={product.available_colors} 
            currentState={color}
            onChange={handleColorChange}  
          />
          </div>

        {/* <!-- Sizes --> */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Size guide
            </a>
          </div>

          <fieldset className="mt-4">
            <legend className="sr-only">Choose a size</legend>
              <RadioButtonInput 
                name="size-choice" 
                totalItemsList={product.available_sizes} 
                itemsAvailables={currentVariant.sizes} 
                currentState={size}
                onChange={handleSizeChange}  
              /> 
          </fieldset>
        </div>
        <button
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Agregar al carrito
        </button>
      </form>
    )
}

export default SelectorVariante
import { ProductDetail, Variant } from "@interfaces/IProduct";
import { useState } from "react";
import RadioButtonInput from "@components/common/RadioButtonInput";
import { toast } from "react-toastify";
import useCartStore from "@store/cart/useCartStore";

interface SelectorVarienteProps {
  product: ProductDetail;
  currentVariant: Variant;
  variants: Variant[];
  setCurrentVariant: (variant: Variant) => void;
}

const SelectorVariante = ({
  product,
  variants,
  currentVariant,
  setCurrentVariant,
}: SelectorVarienteProps) => {
  const [size, setSize] = useState<string>("");
  const { addToCart } = useCartStore();

  const handleOnVariantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const variant = variants.find((v) => v.subProductId === event.target.value);
    if (variant) setCurrentVariant(variant);
  };

  function handleSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSize(event.target.value);
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const toastMessage = toast.loading("Agregando al carrito ⌛");
    
    try {
      if (size === "") throw new Error("Debe seleccionar un talle");
      await addToCart({
        size,
        subProductId: currentVariant.subProductId,
      });
      toast.update(toastMessage, {
        render: "Agregado al carrito",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastMessage, {
        render: (error as Error).message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  return (
    <form className="mt-10" onSubmit={handleOnSubmit}>
      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>

        {/* selector color aca */}
        <RadioButtonInput
          name="color-choice"
          totalItemsList={variants.map(variant => ({ item: variant.subProductId, image: variant.images.front }))}
          itemsAvailables={variants.map(variant => ({ item: variant.subProductId, image: variant.images.front }))}
          currentState={currentVariant.subProductId}
          onChange={handleOnVariantChange}
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
            totalItemsList={ orderSizes(product.available_sizes)}
            itemsAvailables={ orderSizes(currentVariant.sizes) }
            currentState={size}
            onChange={handleSizeChange}
          />
        </fieldset>
      </div>
      <button 
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Agregar al carrito
      </button>
    </form>
  );
};

const orderSizes = (sizes: string[]) => sizes.sort((a, b) => order.indexOf(a.toUpperCase()) - order.indexOf(b.toUpperCase())) 
const order = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export default SelectorVariante;

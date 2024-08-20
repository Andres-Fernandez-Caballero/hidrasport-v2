import { ProductDetail, Variant } from "@interfaces/IProduct";
import RadioButtonInput from "@components/common/RadioButtonInput";
import { toast } from "react-toastify";
interface SelectorVarianteProps {
  product: ProductDetail;
  currentVariant: Variant;
  variants: Variant[];
  setCurrentVariant: (variant: Variant) => void;
  size: string; // Nuevo prop para el tamaño seleccionado
  setSize: (size: string) => void; // Nuevo prop para actualizar el tamaño
}

const SelectorVariante = ({
  product,
  variants,
  currentVariant,
  setCurrentVariant,
  size,
  setSize,
}: SelectorVarianteProps) => {

  const handleOnVariantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const variant = variants.find((v) => v.subProductId === event.target.value);
    if (variant) setCurrentVariant(variant);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  return (
    <form className="mt-10" onSubmit={handleOnSubmit}>
      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>
        <RadioButtonInput
          name="color-choice"
          totalItemsList={variants.map(variant => ({ item: variant.subProductId, image: variant.images.front }))}
          itemsAvailables={variants.map(variant => ({ item: variant.subProductId, image: variant.images.front }))}
          currentState={currentVariant.subProductId}
          onChange={handleOnVariantChange}
        />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Talle</h3>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Guía de talles 
          </a>
        </div>

        <fieldset className="mt-4">
          <RadioButtonInput
            name="size-choice"
            totalItemsList={orderSizes(product.available_sizes)}
            itemsAvailables={orderSizes(currentVariant.sizes)}
            currentState={size}
            onChange={handleSizeChange} // Maneja el cambio de tamaño
          />
        </fieldset>
      </div>
    </form>
  );
};

export async function handleOnSubmit(
  event: React.FormEvent<HTMLFormElement>,
  size: string,
  subProductId: string,
  addToCart: (args: { size: string; subProductId: string }) => Promise<void>
) {
  event.preventDefault();
  const toastMessage = toast.loading("Agregando al carrito ⌛");

  try {
    if (size === "") throw new Error("Debe seleccionar un talle");
    await addToCart({
      size,
      subProductId,
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

const orderSizes = (sizes: string[]) => sizes.sort((a, b) => order.indexOf(a.toUpperCase()) - order.indexOf(b.toUpperCase())) 
const order = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export default SelectorVariante;

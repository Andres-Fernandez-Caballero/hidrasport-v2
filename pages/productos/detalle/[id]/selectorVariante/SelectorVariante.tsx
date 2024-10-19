import { ISubproducto, ProductDetail } from "@interfaces/IProduct";
import RadioButtonInput, { ItemWithImage } from "@components/common/RadioButtonInput";
import { toast } from "react-toastify";
interface SelectorVarianteProps {
  product: ProductDetail;
  currentVariant: ISubproducto;
  variants: ISubproducto[];
  setCurrentVariant: (variant: ISubproducto) => void;
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
    const variant = variants.find((v) => v.id.toString() === event.target.value); // Encontrar el subproducto con el id pasado por parametro
    if (variant) setCurrentVariant(variant);

  };

  function getAvailableTalles(product: ProductDetail): string[] {
    const talles: string[] = [];
  
    product.subproducto.forEach(subproduct => {
      subproduct.talles.forEach(talle => {
        if (!talles.includes(talle.talle)) {
          talles.push(talle.talle);
        }
      });
    });
  
    return talles;
  }
  
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  return (
    // @ts-expect-error { handleOnSubmit should not be asynchronous }
    <form className="mt-10" onSubmit={handleOnSubmit}>
      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>
        <RadioButtonInput
          name="color-choice"
          totalItemsList={variants.map(variant => ({ item: variant.id.toString(), image: variant.images.length > 0 ? variant.images[0].image : '/images/remera_frente.png' } as unknown as ItemWithImage ))} // Mapear cada subproducto para obtener su id y su imagen
          itemsAvailables={variants.map(variant => ({ item: variant.id.toString(), image: variant.images.length > 0 ? variant.images[0].image : '/images/remera_frente.png' } as unknown as ItemWithImage ))} // Mapear cada subproducto para obtener su id y su imagen
          currentState={currentVariant.id.toString()}
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
            totalItemsList={orderSizes(getAvailableTalles(product))}
            itemsAvailables={currentVariant.talles.map(t => t.talle)}
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
  addItemToCart: ( variant: {size: string , subProductId: string}, quantity: number ) => Promise<void>
) {
  event.preventDefault();
  const toastMessage = toast.loading("Agregando al carrito ⌛");

  try {
    if (size === "") throw new Error("Debe seleccionar un talle");
    await addItemToCart({
      size,
      subProductId,
    },1 // quantity of items to add
  );
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

import MenuButton from "../buttons/MenuButton";
import SingleProductView from "../sections/SingleProductView";

type Props = {
  closeModal: () => void;
  productId: number | null;
};

const ModalOne = ({ closeModal, productId }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center z-10 fixed inset-0 overflow-x-hidden overflow-y-auto outline-none focus:outline-none fade-in-right">
      <div className="w-1/4 flex flex-col justify-start items-center border-b-2 border-r-2 border-indigo-200 rounded-md rounded-tr-3xl p-4 modal-gradient relative overscroll-none">
        <MenuButton
          text="X"
          action={closeModal}
          className="text-xl absolute top-0 right-0 py-5 pr-7 text-indigo-500 hover:text-teal-300 underline underline-offset-2"
        />
        <SingleProductView id={productId} />
      </div>
    </div>
  );
};

export default ModalOne;
